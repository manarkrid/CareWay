import React, { useState } from 'react';
import './Login.css';

const ForgotPassword = ({ onNavigateToLogin }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:3001/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erreur lors de la demande');
            }

            setMessage(data.message);
            if (data.previewUrl) {
                console.log("🔗 Lien de test Ethereal:", data.previewUrl);
            }
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
                            <h2>Mot de passe oublié ? 🔒</h2>
                            <p>Entrez votre adresse email pour recevoir un lien de réinitialisation.</p>
                        </div>

                        {error && <div className="auth-alert auth-error"><span className="alert-icon">⚠️</span>{error}</div>}
                        {message && <div className="auth-alert auth-success"><span className="alert-icon">✉️</span>{message}</div>}

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="standard-input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Adresse Email"
                                    required
                                />
                            </div>

                            <button type="submit" className="auth-submit-btn" disabled={loading || message}>
                                {loading ? <span className="loader"></span> : 'Envoyer le lien'}
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

export default ForgotPassword;
