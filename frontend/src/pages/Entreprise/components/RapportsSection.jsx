import React, { useState, useEffect } from 'react';

const RapportsSection = () => {
  const [rapports, setRapports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [periode, setPeriode] = useState('mensuel');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/entreprise/rapports');
      if (response.ok) {
        const data = await response.json();
        setRapports(data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des rapports:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerated({
        titre: `Rapport ${periode === 'mensuel' ? 'mensuel' : 'annuel'} généré`,
        date: new Date().toLocaleDateString('fr-FR'),
        trajets: Math.floor(Math.random() * 200 + 100),
        revenus: `${Math.floor(Math.random() * 8000 + 5000).toLocaleString()}€`,
        tauxAcceptation: `${Math.floor(Math.random() * 10 + 88)}%`,
      });
      setGenerating(false);
    }, 1500);
  };

  const handleDownload = async (report) => {
    try {
      const response = await fetch(`http://localhost:3001/api/entreprise/rapport/${report.id}/download`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `rapport-${report.id}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert("Erreur lors du téléchargement du rapport.");
      }
    } catch (error) {
      console.error("Erreur de téléchargement:", error);
      alert("Une erreur est survenue lors du téléchargement.");
    }
  };

  return (
    <div className="section">
      <div className="section-header">
        <h2>📊 Rapports</h2>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <select value={periode} onChange={e => setPeriode(e.target.value)}
            style={{ border: '1px solid #dee2e6', borderRadius: 6, padding: '6px 12px', fontSize: 14 }}>
            <option value="mensuel">Mensuel</option>
            <option value="annuel">Annuel</option>
          </select>
          <button className="btn-primary" onClick={handleGenerate} disabled={generating}>
            {generating ? '⏳ Génération...' : '📥 Générer rapport'}
          </button>
        </div>
      </div>

      {generated && (
        <div style={{ background: '#d4edda', border: '1px solid #c3e6cb', borderRadius: 8, padding: 16, marginBottom: 16 }}>
          <strong>✅ {generated.titre}</strong> — {generated.date}<br />
          <span style={{ fontSize: 13, color: '#155724' }}>
            {generated.trajets} trajets • {generated.revenus} • Taux d'acceptation : {generated.tauxAcceptation}
          </span>
        </div>
      )}

      <div className="table-container">
        {loading ? (
          <p style={{ textAlign: 'center', padding: 20 }}>Chargement des rapports...</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr><th>Rapport</th><th>Type</th><th>Date</th><th>Trajets</th><th>Revenus</th><th>Taux acceptation</th><th>Action</th></tr>
            </thead>
            <tbody>
              {rapports.map(r => (
                <tr key={r.id}>
                  <td>{r.titre}</td>
                  <td><span style={{ background: r.type === 'Annuel' ? '#fff3cd' : '#cce5ff', color: r.type === 'Annuel' ? '#856404' : '#004085', padding: '2px 8px', borderRadius: 12, fontSize: 12 }}>{r.type}</span></td>
                  <td>{r.date}</td>
                  <td>{r.trajets.toLocaleString()}</td>
                  <td style={{ fontWeight: 600 }}>{r.revenus}</td>
                  <td>{r.tauxAcceptation}</td>
                  <td><button className="btn-filter" style={{ fontSize: 12, padding: '4px 10px' }} onClick={() => handleDownload(r)}>📥 Télécharger</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RapportsSection;
