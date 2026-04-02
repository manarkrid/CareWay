import React, { useState, useEffect } from 'react';
import './Login.css';

const ResetPassword = ({ onNavigateToLogin }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        // Extraire le token de l'URL (?token=...)
        const params = new URLSearchParams(window.location.search);
        const tokenFromUrl = params.get('token');
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
        } else {
            setError("Lien invalide. Aucun token fourni.");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (newPassword !== confirmPassword) {
            return setError('Les mots de passe ne correspondent pas.');
        }

        if (!token) {
            return setError('Token manquant.');
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:3001/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword })
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erreur lors de la réinitialisation');
            }

            setMessage(data.message);

            setTimeout(() => {
                onNavigateToLogin();
            }, 3000);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page-wrapper">
            <div className="auth-split-container" style={{ justifyContent: 'center' }}>
                <div className="auth-form-panel" style={{ flex: 'none', width: '100%', maxWidth: '480px', borderRadius: '24px', margin: 'auto', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                    <div className="auth-form-container">
                        <div className="auth-header" style={{ textAlign: 'center' }}>
                            <h2>Nouveau mot de passe 🔑</h2>
                            <p>Choisissez un mot de passe sécurisé pour votre compte.</p>
                        </div>

                        {error && <div className="auth-alert auth-error"><span className="alert-icon">⚠️</span>{error}</div>}
                        {message && <div className="auth-alert auth-success"><span className="alert-icon">✅</span>{message}</div>}

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="standard-input"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Nouveau mot de passe"
                                    required
                                    disabled={!token || message}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="standard-input"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirmer le mot de passe"
                                    required
                                    disabled={!token || message}
                                />
                            </div>

                            <div className="password-requirements" style={{ marginBottom: '24px' }}>
                                Le mot de passe doit contenir au moins 8 caractères.
                            </div>

                            <button type="submit" className="auth-submit-btn" disabled={loading || !token || message}>
                                {loading ? <span className="loader"></span> : 'Mettre à jour'}
                            </button>
                        </form>

                        <div className="auth-footer">
                            <button type="button" className="auth-switch-btn" onClick={onNavigateToLogin}>
                                ← Retour à la connexion
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
