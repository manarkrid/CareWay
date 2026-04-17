import React, { useState } from 'react';
import API_BASE_URL from '../../services/apiConfig';
import './Login.css'; // We share the same premium CSS

const Register = ({ onNavigateToLogin }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erreur lors de la création du compte');
            }

            setSuccess('Félicitations ! Votre compte a été créé.');

            setTimeout(() => {
                onNavigateToLogin();
            }, 2500);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page-wrapper">
            <div className="auth-split-container">

                {/* Left Branding Panel (Reversed for variation or kept same, we'll keep same for consistency) */}
                <div className="auth-brand-panel register-bg">
                    <div className="brand-content">
                        <h1 className="brand-logo">CareWay</h1>
                        <p className="brand-tagline">
                            Rejoignez les acteurs du transport médical de demain.
                        </p>
                        <div className="brand-features">
                            <div className="feature-item">
                                <span className="feature-icon">🔒</span>
                                <span>Données des missions sécurisées</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">⚡</span>
                                <span>Réception rapide des missions</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">📱</span>
                                <span>Interface optimisée pour mobile</span>
                            </div>
                        </div>
                    </div>
                    <div className="brand-overlay"></div>
                </div>

                {/* Right Form Panel */}
                <div className="auth-form-panel">
                    <div className="auth-form-container register-container">
                        <div className="auth-header">
                            <h2>Créer un compte 🚀</h2>
                            <p>Commencez à optimiser vos trajets dès aujourd'hui</p>
                        </div>

                        {error && (
                            <div className="auth-alert auth-error">
                                <span className="alert-icon">⚠️</span>
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="auth-alert auth-success">
                                <span className="alert-icon">✅</span>
                                {success}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        className="standard-input"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="Prénom"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        className="standard-input"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Nom"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="standard-input"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Adresse Email Professionnelle"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="standard-input"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Mot de passe"
                                    required
                                />
                            </div>

                            <div className="password-requirements">
                                Le mot de passe doit contenir au moins 8 caractères.
                            </div>

                            <button type="submit" className="auth-submit-btn" disabled={loading || success}>
                                {loading ? <span className="loader"></span> : 'Valider l\'inscription'}
                            </button>
                        </form>

                        <div className="auth-footer">
                            <p>Vous avez déjà un compte ?</p>
                            <button
                                type="button"
                                className="auth-switch-btn"
                                onClick={onNavigateToLogin}
                            >
                                Connectez-vous
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Register;
