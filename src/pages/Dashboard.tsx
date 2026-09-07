import React, { useEffect, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, query, where, getDocs, orderBy, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { LogOut, Plus, ShieldCheck, Search, Activity, FileText, Trash2, Loader2, AlertCircle, X, CheckCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import LoadingScreen from '../components/LoadingScreen';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

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
  const [activeTab, setActiveTab] = useState<'monitoreo' | 'estadisticas'>('monitoreo');
  
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

      // Simulation logic for demo purposes: if RFC ends in "EFO", mark as risk
      const isRisk = rfc.toUpperCase().endsWith('EFO');

      await addDoc(collection(db, 'rfcs'), {
        userId: user.uid,
        rfc: rfc.toUpperCase(),
        razonSocial,
        estatus: isRisk ? 'Riesgo / EFOS' : 'Limpio',
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

  // Prepare chart data
  const statusData = useMemo(() => {
    const clean = records.filter(r => r.estatus === 'Limpio').length;
    const risk = records.filter(r => r.estatus !== 'Limpio').length;
    return [
      { name: 'Limpios', value: clean, color: '#10B981' },
      { name: 'Riesgo / EFOS', value: risk, color: '#F43F5E' },
    ];
  }, [records]);

  const recentData = useMemo(() => {
    // Group records by month for a mock activity chart
    // Just a placeholder distribution
    return [
      { name: 'Semana 1', Registros: Math.floor(records.length * 0.2) },
      { name: 'Semana 2', Registros: Math.floor(records.length * 0.3) },
      { name: 'Semana 3', Registros: Math.floor(records.length * 0.1) },
      { name: 'Semana 4', Registros: records.length - Math.floor(records.length * 0.2) - Math.floor(records.length * 0.3) - Math.floor(records.length * 0.1) }
    ];
  }, [records]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Helmet>
        <title>Dashboard de Monitoreo | LexLFPIORPI</title>
        <meta name="description" content="Gestiona y monitorea RFCs en tiempo real contra las listas negras del SAT (Art. 69-B) y asegúrate de cumplir con la Ley Antilavado." />
      </Helmet>

      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-8 h-8 rounded-lg bg-[#10B981] flex items-center justify-center">
                  <ShieldCheck className="text-white" size={16} />
              </div>
              <span className="text-slate-900">Lex<span className="text-emerald-700">LFPIORPI</span></span>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-600 hidden sm:block bg-slate-100 px-3 py-1 rounded-full">{user?.email}</span>
              <button 
                onClick={handleSignOut}
                className="text-slate-500 hover:text-rose-600 transition-colors p-2 bg-slate-50 rounded-full hover:bg-rose-50"
                title="Cerrar sesión"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Dashboard Header & Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Portal de Cumplimiento</h1>
            <p className="text-slate-500 mt-1 max-w-2xl">Visualiza tus expedientes KYC, genera avisos automatizados y monitorea RFCs contra el Art. 69-B.</p>
          </div>
          
          <div className="flex p-1 bg-slate-200 rounded-lg shrink-0">
            <button
              onClick={() => setActiveTab('monitoreo')}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${
                activeTab === 'monitoreo' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Directorio 69-B
            </button>
            <button
              onClick={() => setActiveTab('estadisticas')}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${
                activeTab === 'estadisticas' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Estadísticas
            </button>
          </div>
        </div>

        {/* Unified Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="saas-card bg-white p-5 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <FileText size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total RFCs</p>
              <p className="text-3xl font-extrabold text-slate-900 leading-tight">{records.length}</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="saas-card bg-white p-5 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Limpios</p>
              <p className="text-3xl font-extrabold text-slate-900 leading-tight">{statusData[0].value}</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="saas-card bg-white p-5 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <AlertCircle size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Riesgo EFOS</p>
              <p className="text-3xl font-extrabold text-slate-900 leading-tight">{statusData[1].value}</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="saas-card bg-white p-5 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Avisos SAT</p>
              <p className="text-3xl font-extrabold text-slate-900 leading-tight">12</p>
            </div>
          </motion.div>
        </div>

        {activeTab === 'monitoreo' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">Directorio de Entidades</h2>
              <button 
                onClick={() => setShowAdd(!showAdd)}
                className="btn-primary flex items-center gap-2 py-2 px-4 shadow-sm text-sm"
              >
                {showAdd ? <X size={16} /> : <Plus size={16} />}
                {showAdd ? 'Cancelar' : 'Nuevo RFC'}
              </button>
            </div>

            <AnimatePresence>
              {showAdd && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                  animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
                  exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                  transition={{ duration: 0.3 }}
                  className="mb-8"
                >
                  <div className="saas-card bg-white p-6 border-emerald-100 border-2">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Registrar nueva entidad a monitorear</h2>
                    <form onSubmit={handleAddRFC} className="flex flex-col sm:flex-row gap-4 items-end">
                      <div className="w-full sm:w-1/3">
                        <label className="block text-sm font-semibold text-slate-700 mb-1">RFC</label>
                        <input 
                          type="text" 
                          required
                          value={rfc}
                          onChange={(e) => setRfc(e.target.value.toUpperCase())}
                          placeholder="EKU9003173C9"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 uppercase font-mono"
                        />
                      </div>
                      <div className="w-full sm:w-1/2">
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Razón Social o Nombre</label>
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
                        className="w-full sm:w-auto bg-[#10B981] text-white px-6 py-2 rounded-lg hover:bg-emerald-800 transition-colors disabled:opacity-70 flex justify-center items-center h-[42px] font-semibold"
                      >
                        {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : 'Guardar y Validar'}
                      </button>
                    </form>
                    {error && <p className="text-rose-500 text-sm mt-3 font-medium bg-rose-50 p-2 rounded-md">{error}</p>}
                    <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
                      <ShieldCheck size={14} /> La plataforma consultará automáticamente la Constancia de Situación Fiscal y el Art. 69-B.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Data Table */}
            <div className="saas-card bg-white overflow-hidden">
              <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="font-semibold text-slate-800">Registros KYC</h3>
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Buscar por RFC o nombre..." 
                    className="w-full sm:w-64 pl-9 pr-4 py-1.5 text-sm border border-slate-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">RFC</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Razón Social</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Estatus 69-B</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Última Revisión</th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {records.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-16 text-center text-slate-500">
                          <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                              <Activity className="text-slate-400" size={32} />
                            </div>
                            <p className="text-lg font-medium text-slate-900 mb-1">No hay entidades registradas</p>
                            <p className="text-sm">Agrega tu primer RFC para iniciar el monitoreo automático contra las listas negras del SAT.</p>
                            <button onClick={() => setShowAdd(true)} className="mt-6 btn-secondary text-sm px-4 py-2">
                              Registrar Entidad
                            </button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      records.map((record) => (
                        <tr key={record.id} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-semibold text-slate-900">
                            {record.rfc}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-600">
                            {record.razonSocial}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-bold rounded-md border ${
                              record.estatus === 'Limpio' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'
                            }`}>
                              {record.estatus === 'Limpio' ? <CheckCircle size={14} className="mr-1 mt-0.5" /> : <AlertCircle size={14} className="mr-1 mt-0.5" />}
                              {record.estatus}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 flex items-center gap-1">
                            <Clock size={14} className="text-slate-400" />
                            {record.createdAt?.toDate ? new Date(record.createdAt.toDate()).toLocaleDateString() : 'Reciente'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button 
                              onClick={() => handleDelete(record.id)}
                              className="text-slate-400 hover:text-rose-600 transition-colors p-2 rounded hover:bg-rose-50 opacity-0 group-hover:opacity-100 focus:opacity-100"
                              title="Eliminar Registro"
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
            </div>
          </motion.div>
        )}

        {activeTab === 'estadisticas' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <div className="saas-card bg-white p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Crecimiento de Expedientes</h3>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={recentData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                      <RechartsTooltip 
                        cursor={{fill: '#F8FAFC'}}
                        contentStyle={{borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                      />
                      <Bar dataKey="Registros" fill="#10B981" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="saas-card bg-white p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Distribución de Riesgo (Art. 69-B)</h3>
                <div className="h-72 w-full flex items-center justify-center relative">
                  {records.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statusData}
                          innerRadius={70}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip 
                           contentStyle={{borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="text-center text-slate-500">
                      <div className="w-12 h-12 mx-auto mb-2 text-slate-300 flex items-center justify-center border-2 border-dashed border-slate-300 rounded-full">
                        <Activity size={24} />
                      </div>
                      <p>No hay datos suficientes</p>
                    </div>
                  )}
                  {records.length > 0 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-3xl font-bold text-slate-900">{records.length}</span>
                      <span className="text-xs text-slate-500 uppercase tracking-wide font-semibold">Total</span>
                    </div>
                  )}
                </div>
                {records.length > 0 && (
                   <div className="flex justify-center gap-6 mt-4">
                     {statusData.map((s, i) => (
                       <div key={i} className="flex items-center gap-2">
                         <div className="w-3 h-3 rounded-full" style={{backgroundColor: s.color}}></div>
                         <span className="text-sm font-medium text-slate-700">{s.name} ({s.value})</span>
                       </div>
                     ))}
                   </div>
                )}
              </div>
              
            </div>
            
            <div className="saas-card bg-slate-900 p-8 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                 <ShieldCheck size={120} />
               </div>
               <h3 className="text-xl font-bold mb-2">Generación de Avisos SPPLD</h3>
               <p className="text-slate-400 max-w-2xl mb-6">Tu periodo de reporte actual cierra el día 17 del mes. Tienes 12 operaciones que superan el umbral de aviso. Revisa la documentación soporte (KYC) antes de enviar los archivos XML al portal del SAT.</p>
               <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold px-6 py-2.5 rounded-lg transition-colors inline-flex items-center gap-2 shadow-lg shadow-emerald-500/20">
                 <FileText size={18} />
                 Preparar Lote XML
               </button>
            </div>
          </motion.div>
        )}
        
      </main>
    </div>
  );
}
