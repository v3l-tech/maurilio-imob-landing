import { useState, useEffect } from 'react';
import { supabase, type Property } from '../lib/supabase';
import { Trash2, Plus, Image as ImageIcon, Loader2, Edit, X, Link as LinkIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/ui/Modal';

export default function Admin() {
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Dashboard state
  const [properties, setProperties] = useState<Property[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    region: '',
    size_m2: '',
    rooms: '',
    description: '',
  });
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [photosFiles, setPhotosFiles] = useState<File[]>([]);
  
  // Existing files state (for editing)
  const [existingCoverPhoto, setExistingCoverPhoto] = useState<string | null>(null);
  const [existingPhotos, setExistingPhotos] = useState<string[]>([]);

  // Modal State
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'alert' | 'confirm';
    onConfirm?: () => void;
    onCancel?: () => void;
  }>({ isOpen: false, title: '', message: '', type: 'alert' });

  const showAlert = (title: string, message: string) => {
    setModalConfig({ 
      isOpen: true, 
      title, 
      message, 
      type: 'alert', 
      onConfirm: () => setModalConfig(prev => ({ ...prev, isOpen: false })),
      onCancel: () => setModalConfig(prev => ({ ...prev, isOpen: false }))
    });
  };

  const showConfirm = (title: string, message: string, onConfirmAction: () => void) => {
    setModalConfig({
      isOpen: true,
      title,
      message,
      type: 'confirm',
      onConfirm: () => {
        setModalConfig(prev => ({ ...prev, isOpen: false }));
        onConfirmAction();
      },
      onCancel: () => setModalConfig(prev => ({ ...prev, isOpen: false }))
    });
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (session) fetchProperties();
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchProperties();
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchProperties() {
    const { data } = await supabase.from('properties').select('*').order('created_at', { ascending: false });
    if (data) setProperties(data);
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) showAlert('Erro de Login', error.message);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const uploadFile = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;
    const { error: uploadError } = await supabase.storage.from('property_images').upload(filePath, file);
    if (uploadError) throw uploadError;
    const { data } = supabase.storage.from('property_images').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const resetForm = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ title: '', region: '', size_m2: '', rooms: '', description: '' });
    setCoverFile(null);
    setPhotosFiles([]);
    setExistingCoverPhoto(null);
    setExistingPhotos([]);
  };

  const handleEdit = (prop: Property) => {
    setIsAdding(true);
    setEditingId(prop.id);
    setFormData({
      title: prop.title,
      region: prop.region,
      size_m2: String(prop.size_m2),
      rooms: String(prop.rooms),
      description: prop.description,
    });
    setExistingCoverPhoto(prop.cover_photo);
    setExistingPhotos(prop.photos || []);
    setCoverFile(null);
    setPhotosFiles([]);
  };

  const handleSubmitProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    
    try {
      // Se não enviou uma nova foto de capa e não tinha uma anterior, exige.
      if (!coverFile && !existingCoverPhoto) {
         throw new Error("A foto de capa é obrigatória.");
      }

      let cover_photo = existingCoverPhoto;
      if (coverFile) {
        cover_photo = await uploadFile(coverFile);
      }

      const newUploadedPhotos = [];
      for (const file of photosFiles) {
        const url = await uploadFile(file);
        newUploadedPhotos.push(url);
      }
      const photos = [...existingPhotos, ...newUploadedPhotos];

      const propertyData = {
        title: formData.title,
        region: formData.region,
        size_m2: Number(formData.size_m2),
        rooms: Number(formData.rooms),
        description: formData.description,
        cover_photo,
        photos
      };

      if (editingId) {
        const { error } = await supabase.from('properties').update(propertyData).eq('id', editingId);
        if (error) throw error;
        showAlert('Sucesso', 'Imóvel atualizado com sucesso!');
      } else {
        const { error } = await supabase.from('properties').insert([propertyData]);
        if (error) throw error;
        showAlert('Sucesso', 'Imóvel cadastrado com sucesso!');
      }
      
      resetForm();
      fetchProperties();
    } catch (error: any) {
      showAlert('Erro', 'Erro ao salvar imóvel: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = (prop: Property) => {
    showConfirm('Confirmar Exclusão', 'Tem certeza que deseja excluir este imóvel?', async () => {
      const { error } = await supabase.from('properties').delete().eq('id', prop.id);
      if (error) {
        showAlert('Erro', 'Erro ao excluir: ' + error.message);
        return;
      }

      // Delete images from storage
      const extractPath = (url: string) => {
        const parts = url.split('/property_images/');
        return parts.length > 1 ? parts[1] : null;
      };

      const pathsToDelete: string[] = [];
      if (prop.cover_photo) {
        const path = extractPath(prop.cover_photo);
        if (path) pathsToDelete.push(path);
      }
      if (prop.photos && prop.photos.length > 0) {
        prop.photos.forEach(url => {
          const path = extractPath(url);
          if (path) pathsToDelete.push(path);
        });
      }

      if (pathsToDelete.length > 0) {
        const { error: storageError } = await supabase.storage.from('property_images').remove(pathsToDelete);
        if (storageError) {
          console.error('Erro ao excluir imagens do storage:', storageError);
        }
      }

      fetchProperties();
    });
  };

  if (loading) {
    return <div className="min-h-screen bg-brand-deep flex items-center justify-center"><Loader2 className="animate-spin text-brand-gold w-8 h-8" /></div>;
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-brand-deep flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="bg-brand-card p-8 rounded-2xl w-full max-w-md border border-brand-divider">
          <h2 className="text-2xl font-bold text-white mb-6 font-display text-center">Admin Login</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-brand-muted text-sm mb-1">Email</label>
              <input type="email" required className="w-full bg-brand-deep border border-brand-divider/50 rounded-lg p-2 text-white" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-brand-muted text-sm mb-1">Senha</label>
              <input type="password" required className="w-full bg-brand-deep border border-brand-divider/50 rounded-lg p-2 text-white" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-brand-gold hover:bg-brand-gold-light text-brand-deep font-bold py-2 px-4 rounded-lg transition-colors mt-4">
              Entrar
            </button>
          </div>
          <button type="button" onClick={() => navigate('/')} className="w-full text-brand-muted text-sm mt-4 hover:text-white">Voltar ao site</button>
        </form>
        <Modal {...modalConfig} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-deep text-brand-text p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-8 bg-brand-card p-6 rounded-2xl border border-brand-divider">
          <h1 className="text-2xl font-bold font-display gold-gradient-text">Painel Administrativo</h1>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="text-sm text-brand-muted hover:text-white transition-colors">Ver Site</button>
            <button onClick={handleLogout} className="text-sm bg-red-500/20 text-red-400 hover:bg-red-500/30 px-4 py-2 rounded-lg transition-colors">Sair</button>
          </div>
        </header>

        {isAdding ? (
          <div className="bg-brand-card p-6 sm:p-8 rounded-2xl border border-brand-divider mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">{editingId ? 'Editar Imóvel' : 'Cadastrar Novo Imóvel'}</h2>
              <button onClick={resetForm} className="text-brand-muted hover:text-white">Cancelar</button>
            </div>
            <form onSubmit={handleSubmitProperty} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-brand-muted text-sm mb-1">Título do Anúncio</label>
                  <input required type="text" className="form-input" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Ex: Casa em Condomínio Fechado" />
                </div>
                <div>
                  <label className="block text-brand-muted text-sm mb-1">Região / Cidade</label>
                  <input required type="text" className="form-input" value={formData.region} onChange={e => setFormData({...formData, region: e.target.value})} placeholder="Ex: Sorriso, MT" />
                </div>
                <div>
                  <label className="block text-brand-muted text-sm mb-1">Tamanho (m²)</label>
                  <input required type="number" className="form-input" value={formData.size_m2} onChange={e => setFormData({...formData, size_m2: e.target.value})} placeholder="Ex: 320" />
                </div>
                <div>
                  <label className="block text-brand-muted text-sm mb-1">Quantidade de Cômodos</label>
                  <input required type="number" className="form-input" value={formData.rooms} onChange={e => setFormData({...formData, rooms: e.target.value})} placeholder="Ex: 4" />
                </div>
              </div>

              <div>
                <label className="block text-brand-muted text-sm mb-1">Descrição</label>
                <textarea required className="form-input min-h-[100px]" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Detalhes do imóvel..." />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-brand-divider/30">
                <div>
                  <label className="block text-brand-muted text-sm mb-2 font-medium flex items-center gap-2">
                    <ImageIcon size={16} /> Foto de Capa (Principal)
                  </label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    required={!existingCoverPhoto} 
                    onChange={e => setCoverFile(e.target.files ? e.target.files[0] : null)} 
                    className="w-full text-sm text-brand-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-gold/10 file:text-brand-gold hover:file:bg-brand-gold/20" 
                  />
                  {existingCoverPhoto && !coverFile && (
                    <div className="mt-3 relative w-24 h-24 rounded-lg overflow-hidden border border-brand-divider">
                      <img src={existingCoverPhoto} alt="Capa" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-brand-muted text-sm mb-2 font-medium flex items-center gap-2">
                    <ImageIcon size={16} /> Fotos Adicionais (Galeria)
                  </label>
                  {/* Removido o atributo 'multiple' para permitir selecionar uma a uma se preferir, mas se usar multiple também vai adicionar no array */}
                  <input 
                    type="file" 
                    accept="image/*" 
                    multiple
                    onChange={e => {
                      if (e.target.files) {
                        setPhotosFiles(prev => [...prev, ...Array.from(e.target.files!)]);
                      }
                    }} 
                    className="w-full text-sm text-brand-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-gold/10 file:text-brand-gold hover:file:bg-brand-gold/20" 
                  />
                  <p className="text-xs text-brand-muted/70 mt-1">Você pode selecionar várias vezes para ir adicionando.</p>
                  
                  {/* Exibe arquivos novos prestes a subir */}
                  {photosFiles.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {photosFiles.map((file, i) => (
                        <div key={i} className="text-xs bg-brand-deep px-2 py-1 rounded flex items-center gap-2 border border-brand-divider">
                          <span className="truncate max-w-[150px]">{file.name}</span>
                          <button type="button" onClick={() => setPhotosFiles(photosFiles.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-300">
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Exibe imagens antigas na edição */}
                  {existingPhotos.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {existingPhotos.map((url, i) => (
                        <div key={i} className="relative w-16 h-16 rounded overflow-hidden group border border-brand-divider">
                          <img src={url} className="w-full h-full object-cover" />
                          <button 
                            type="button" 
                            onClick={() => setExistingPhotos(existingPhotos.filter((_, idx) => idx !== i))} 
                            className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Remover foto antiga"
                          >
                            <Trash2 size={16}/>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button type="submit" disabled={uploading} className="w-full bg-brand-gold hover:bg-brand-gold-light text-brand-deep font-bold py-3 px-4 rounded-xl transition-colors mt-8 flex justify-center items-center gap-2">
                {uploading ? <><Loader2 className="animate-spin" size={20} /> Salvando Imóvel...</> : (editingId ? 'Atualizar Imóvel' : 'Salvar Imóvel')}
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-brand-card p-6 sm:p-8 rounded-2xl border border-brand-divider">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Imóveis Cadastrados</h2>
              <button onClick={() => { resetForm(); setIsAdding(true); }} className="flex items-center gap-2 bg-brand-gold/20 text-brand-gold hover:bg-brand-gold hover:text-brand-deep px-4 py-2 rounded-lg transition-colors font-medium">
                <Plus size={18} /> Novo Imóvel
              </button>
            </div>

            {properties.length === 0 ? (
              <p className="text-brand-muted text-center py-8">Nenhum imóvel cadastrado ainda.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map(prop => (
                  <div key={prop.id} className="bg-brand-deep rounded-xl border border-brand-divider/50 overflow-hidden relative group flex flex-col">
                    <div className="relative h-40">
                      <img src={prop.cover_photo || ''} alt={prop.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEdit(prop)}
                          className="bg-brand-card text-brand-gold p-2 rounded-lg hover:bg-brand-gold hover:text-brand-deep shadow-lg"
                          title="Editar Imóvel"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(prop)}
                          className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 shadow-lg"
                          title="Excluir Imóvel"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex items-start justify-between gap-2">
                      <div className="overflow-hidden">
                        <h3 className="font-semibold text-white truncate" title={prop.title}>{prop.title}</h3>
                        <p className="text-sm text-brand-muted mt-1">{prop.region}</p>
                      </div>
                      <button
                        onClick={() => {
                          const url = `${window.location.origin}/imovel/${prop.id}`;
                          navigator.clipboard.writeText(url);
                          showAlert('Link Copiado!', 'O link deste imóvel foi copiado para sua área de transferência. Você já pode enviar para seus clientes!');
                        }}
                        className="shrink-0 text-brand-muted hover:text-brand-gold transition-colors p-2 bg-brand-card/50 rounded-lg border border-brand-divider/50 hover:border-brand-gold/30"
                        title="Copiar link do imóvel"
                      >
                        <LinkIcon size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <Modal {...modalConfig} />
    </div>
  );
}
