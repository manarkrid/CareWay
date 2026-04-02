import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin, onNavigateToRegister, onNavigateToForgotPassword }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Email ou mot de passe incorrect.');
            }

            onLogin(data.user, data.access_token);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page-wrapper">
            <div className="auth-split-container">
                {/* Left Branding Panel */}
                <div className="auth-brand-panel">
                    <div className="brand-content">
                        <h1 className="brand-logo">CareWay</h1>
                        <p className="brand-tagline">
                            La solution incontournable pour la gestion optimisée de vos transports sanitaires.
                        </p>
                        <div className="brand-features">
                            <div className="feature-item">
                                <span className="feature-icon">🚑</span>
                                <span>Gestion des missions transport</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">📅</span>
                                <span>Consultation du planning des trajets</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">💳</span>
                                <span>Suivi GPS en temps réel</span>
                            </div>
                        </div>
                    </div>
                    <div className="brand-overlay"></div>
                </div>

                {/* Right Form Panel */}
                <div className="auth-form-panel">
                    <div className="auth-form-container">
                        <div className="auth-header">
                            <h2>Bienvenue ! 👋</h2>
                            <p>Connectez-vous à votre espace coordinateur</p>
                        </div>

                        {error && (
                            <div className="auth-alert auth-error">
                                <span className="alert-icon">⚠️</span>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-group">
                                <input
                                    type="email"
                                    id="email"
                                    className="standard-input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Adresse Email"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="password"
                                    id="password"
                                    className="standard-input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Mot de passe"
                                    required
                                />
                            </div>

                            <div className="form-options">
                                <label className="checkbox-container">
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                    Se souvenir de moi
                                </label>
                                <button type="button" onClick={onNavigateToForgotPassword} className="forgot-password" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>Mot de passe oublié ?</button>
                            </div>

                            <button type="submit" className="auth-submit-btn" disabled={loading}>
                                {loading ? <span className="loader"></span> : 'Se connecter'}
                            </button>
                        </form>

                        <div className="auth-footer">
                            <p>Nouveau sur CareWay ?</p>
                            <button
                                type="button"
                                className="auth-switch-btn"
                                onClick={onNavigateToRegister}
                            >
                                Créer un compte entreprise
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
