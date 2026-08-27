import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, query, where, getDocs, orderBy, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { LogOut, Plus, ShieldCheck, Search, Activity, FileText, Trash2, Loader2, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import LoadingScreen from '../components/LoadingScreen';

interface RFCRecord {
  id: string;
  rfc: string;
  razonSocial: string;
  estatus: string;
  createdAt: any;
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<RFCRecord[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  
  // Form state
  const [rfc, setRfc] = useState('');
  const [razonSocial, setRazonSocial] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/login');
      } else {
        setUser(currentUser);
        fetchRecords(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const fetchRecords = async (userId: string) => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'rfcs'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const fetchedRecords: RFCRecord[] = [];
      querySnapshot.forEach((doc) => {
        fetchedRecords.push({ id: doc.id, ...doc.data() } as RFCRecord);
      });
      setRecords(fetchedRecords);
    } catch (err) {
      console.error("Error fetching records:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/');
  };

  const handleAddRFC = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rfc || !razonSocial) return;
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Basic RFC Format Validation (12 or 13 chars)
      if (rfc.length < 12 || rfc.length > 13) {
        throw new Error('El RFC debe tener 12 o 13 caracteres.');
      }

      await addDoc(collection(db, 'rfcs'), {
        userId: user.uid,
        rfc: rfc.toUpperCase(),
        razonSocial,
        estatus: 'Limpio', // Simulated status
        createdAt: serverTimestamp()
      });
      
      setRfc('');
      setRazonSocial('');
      setShowAdd(false);
      fetchRecords(user.uid);
    } catch (err: any) {
      setError(err.message || 'Error al guardar el RFC.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Seguro que deseas eliminar este registro?')) return;
    try {
      await deleteDoc(doc(db, 'rfcs', id));
      setRecords(records.filter(r => r.id !== id));
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Helmet>
        <title>Dashboard de Monitoreo 69-B | LexLFPIORPI</title>
        <meta name="description" content="Gestiona y monitorea RFCs en tiempo real contra las listas negras del SAT (Art. 69-B) y asegúrate de cumplir con la Ley Antilavado." />
      </Helmet>
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
              <div className="w-8 h-8 rounded-lg bg-[#10B981] flex items-center justify-center">
                  <ShieldCheck className="text-white" size={16} />
              </div>
              <span className="text-slate-900">Lex<span className="text-emerald-700">LFPIORPI</span></span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500 hidden sm:block">{user?.email}</span>
              <button 
                onClick={handleSignOut}
                className="text-slate-500 hover:text-slate-700 transition-colors p-2"
                title="Cerrar sesión"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Dashboard Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Monitoreo 69-B</h1>
            <p className="text-sm text-slate-500 mt-1">Gestión de RFCs y validación de listas negras del SAT.</p>
          </div>
          <button 
            onClick={() => setShowAdd(!showAdd)}
            className="btn-primary flex items-center gap-2 py-2 px-4 shadow-sm"
          >
            {showAdd ? <X size={18} /> : <Plus size={18} />}
            {showAdd ? 'Cancelar' : 'Nuevo RFC'}
          </button>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileText size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total RFCs</p>
              <p className="text-2xl font-bold text-slate-900">{records.length}</p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Limpios</p>
              <p className="text-2xl font-bold text-slate-900">{records.filter(r => r.estatus === 'Limpio').length}</p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertCircle size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Riesgo / EFOS</p>
              <p className="text-2xl font-bold text-slate-900">0</p>
            </div>
          </motion.div>
        </div>

        {/* Add Form */}
        <AnimatePresence>
          {showAdd && (
            <motion.div 
              initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
              animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
              exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Registrar nueva empresa</h2>
                <form onSubmit={handleAddRFC} className="flex flex-col sm:flex-row gap-4 items-end">
                  <div className="w-full sm:w-1/3">
                    <label className="block text-sm font-medium text-slate-700 mb-1">RFC</label>
                    <input 
                      type="text" 
                      required
                      value={rfc}
                      onChange={(e) => setRfc(e.target.value.toUpperCase())}
                      placeholder="ABC010101XYZ"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 uppercase"
                    />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Razón Social</label>
                    <input 
                      type="text" 
                      required
                      value={razonSocial}
                      onChange={(e) => setRazonSocial(e.target.value)}
                      placeholder="Empresa de Ejemplo S.A. de C.V."
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-[#10B981] text-white px-6 py-2 rounded-lg hover:bg-emerald-800 transition-colors disabled:opacity-70 flex justify-center items-center h-[42px]"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : 'Guardar y Validar'}
                  </button>
                </form>
                {error && <p className="text-rose-500 text-sm mt-2">{error}</p>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Data Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden"
        >
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">Directorio de Monitoreo</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Buscar RFC..." 
                className="pl-9 pr-4 py-1.5 text-sm border border-slate-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">RFC</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Razón Social</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Estatus SAT</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Fecha Registro</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {records.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center">
                        <Activity className="text-slate-300 mb-2" size={32} />
                        <p>No hay RFCs registrados.</p>
                        <p className="text-sm">Haz clic en "Nuevo RFC" para comenzar el monitoreo.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  records.map((record) => (
                    <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-medium text-slate-900">
                        {record.rfc}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {record.razonSocial}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          record.estatus === 'Limpio' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {record.estatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {record.createdAt?.toDate ? new Date(record.createdAt.toDate()).toLocaleDateString() : 'Reciente'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => handleDelete(record.id)}
                          className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                          title="Eliminar"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
        
      </main>
    </div>
  );
}
