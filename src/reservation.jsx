import React, { useState } from 'react';
import { Film, Users, CreditCard, Menu, X, Home, Calendar, Ticket, Phone, Star, Clock, MapPin, Mail } from 'lucide-react';
export default function CinemaReservation() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [step, setStep] = useState(1);
  const [bookedSeats, setBookedSeats] = useState([12, 13, 14, 27, 28]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const movies = [
    { 
      id: 1, 
      title: "Inception", 
      time: "20:00", 
      price: 80,
      duration: "2h 28min",
      genre: "Science-Fiction",
      rating: "4.8",
      description: "Un voleur qui s'infiltre dans les rêves se voit offrir une chance de retrouver sa vie d'avant.",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop"
    },
    { 
      id: 2, 
      title: "Interstellar", 
      time: "18:30", 
      price: 80,
      duration: "2h 49min",
      genre: "Science-Fiction",
      rating: "4.9",
      description: "Une équipe d'explorateurs voyage à travers un trou de ver pour assurer la survie de l'humanité.",
      image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop"
    },
    { 
      id: 3, 
      title: "The Matrix", 
      time: "21:30", 
      price: 75,
      duration: "2h 16min",
      genre: "Action, Science-Fiction",
      rating: "4.7",
      description: "Un programmeur découvre que la réalité qu'il connaît est une simulation créée par des machines.",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop"
    },
  ];

  const rows = 8;
  const seatsPerRow = 10;

  const handleSeatClick = (seatNum) => {
    if (bookedSeats.includes(seatNum)) return;
    
    if (selectedSeats.includes(seatNum)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatNum));
    } else {
      setSelectedSeats([...selectedSeats, seatNum]);
    }
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    setStep(2);
  };

  const handleConfirmBooking = () => {
    setBookedSeats([...bookedSeats, ...selectedSeats]);
    const newReservation = {
      id: Date.now(),
      movie: selectedMovie,
      seats: selectedSeats,
      date: new Date().toLocaleDateString('fr-FR')
    };
    setReservations([...reservations, newReservation]);
    setStep(3);
  };

  const getSeatStatus = (seatNum) => {
    if (bookedSeats.includes(seatNum)) return 'booked';
    if (selectedSeats.includes(seatNum)) return 'selected';
    return 'available';
  };

  const totalPrice = selectedSeats.length * (selectedMovie?.price || 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navbar */}
      <nav className="bg-black/40 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => {setStep(1); setSelectedSeats([]); setSelectedMovie(null);}}>
              <Film className="text-cyan-400" size={32} />
              <span className="text-white text-2xl font-bold">CinéRéserve</span>
            </div>

            {/* Menu Desktop */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => {setStep(1); setSelectedSeats([]); setSelectedMovie(null);}} className="text-white hover:text-cyan-400 transition flex items-center gap-2">
                <Home size={18} />
                Accueil
              </button>
              <button onClick={() => {setStep(2); if(!selectedMovie) setSelectedMovie(movies[0]);}} className="text-white hover:text-cyan-400 transition flex items-center gap-2">
                <Calendar size={18} />
                Séances
              </button>
              <button onClick={() => {setStep(4);}} className="text-white hover:text-cyan-400 transition flex items-center gap-2">
                <Ticket size={18} />
                Mes Réservations
              </button>
              <button onClick={() => {setStep(5);}} className="text-white hover:text-cyan-400 transition flex items-center gap-2">
                <Phone size={18} />
                Contact
              </button>
            </div>

            {/* Bouton Connexion Desktop */}
            <div className="hidden md:block">
              <button onClick={() => {setStep(6);}} className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-6 py-2 rounded-lg font-bold hover:scale-105 transition-all">
                {isLoggedIn ? `${userEmail.split('@')[0]}` : 'Connexion'}
              </button>
            </div>

            {/* Bouton Menu Mobile */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/60 backdrop-blur-lg border-t border-white/10">
            <div className="px-4 py-4 space-y-3">
              <button onClick={() => {setStep(1); setSelectedSeats([]); setSelectedMovie(null); setMobileMenuOpen(false);}} className="w-full text-left text-white hover:text-cyan-400 transition py-2 flex items-center gap-2">
                <Home size={18} />
                Accueil
              </button>
              <button onClick={() => {setStep(2); if(!selectedMovie) setSelectedMovie(movies[0]); setMobileMenuOpen(false);}} className="w-full text-left text-white hover:text-cyan-400 transition py-2 flex items-center gap-2">
                <Calendar size={18} />
                Séances
              </button>
              <button onClick={() => {setStep(4); setMobileMenuOpen(false);}} className="w-full text-left text-white hover:text-cyan-400 transition py-2 flex items-center gap-2">
                <Ticket size={18} />
                Mes Réservations
              </button>
              <button onClick={() => {setStep(5); setMobileMenuOpen(false);}} className="w-full text-left text-white hover:text-cyan-400 transition py-2 flex items-center gap-2">
                <Phone size={18} />
                Contact
              </button>
              <button className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-6 py-2 rounded-lg font-bold" onClick={() => {setStep(6); setMobileMenuOpen(false);}}>
                {isLoggedIn ? `${userEmail.split('@')[0]}` : 'Connexion'}
              </button>
            </div>
          </div>
        )}
      </nav>

      <div className="p-4 sm:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          {step === 1 && (
            <>
              <div className="text-center mb-12 mt-8">
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">🎬 Films à l'affiche</h1>
                <p className="text-blue-200 text-lg">Découvrez notre sélection de films et réservez vos places facilement</p>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                  <MapPin className="text-cyan-400 mb-2" size={24} />
                  <h3 className="text-white font-bold">Casablanca </h3>
                  <p className="text-blue-200 text-sm">Boulevard de la Corniche</p>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                  <Clock className="text-cyan-400 mb-2" size={24} />
                  <h3 className="text-white font-bold">Horaires</h3>
                  <p className="text-blue-200 text-sm">De 14h00 à 00h00</p>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                  <Ticket className="text-cyan-400 mb-2" size={24} />
                  <h3 className="text-white font-bold">Tarifs</h3>
                  <p className="text-blue-200 text-sm">À partir de 75 MAD</p>
                </div>
              </div>

              {/* Étape 1: Sélection du film */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-2xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-2">
                  <Film className="text-cyan-400" />
                  Choisissez votre film
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {movies.map(movie => (
                    <div
                      key={movie.id}
                      onClick={() => handleMovieSelect(movie)}
                      className="bg-white/20 backdrop-blur rounded-xl overflow-hidden cursor-pointer hover:bg-white/30 transition-all hover:scale-105 border border-white/20 shadow-xl"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={movie.image} 
                          alt={movie.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                        <div className="absolute top-3 right-3 bg-cyan-400 text-black px-2 py-1 rounded-lg flex items-center gap-1 font-bold text-sm">
                          <Star size={14} fill="currentColor" />
                          {movie.rating}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-bold text-white mb-2">{movie.title}</h3>
                        <p className="text-blue-200 text-sm mb-2">{movie.description}</p>
                        <div className="flex items-center gap-2 text-blue-300 text-sm mb-2">
                          <Clock size={14} />
                          <span>{movie.duration}</span>
                          <span>•</span>
                          <span>{movie.genre}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-blue-200">Séance: {movie.time}</p>
                          <p className="text-cyan-400 font-bold text-lg">{movie.price} MAD</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Étape 2: Sélection des sièges */}
          {step === 2 && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-2xl mt-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                    <Users className="text-cyan-400" />
                    Choisissez vos sièges
                  </h2>
                  <p className="text-blue-200 mt-1">{selectedMovie.title} - {selectedMovie.time}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Star className="text-cyan-400" size={16} fill="currentColor" />
                    <span className="text-white">{selectedMovie.rating}</span>
                    <span className="text-blue-300">• {selectedMovie.duration}</span>
                  </div>
                </div>
                <button
                  onClick={() => { setStep(1); setSelectedSeats([]); }}
                  className="text-white hover:text-yellow-400 transition bg-white/10 px-4 py-2 rounded-lg"
                >
                  ← Retour
                </button>
              </div>

              {/* Écran */}
              <div className="mb-8">
                <div className="w-3/4 h-2 bg-gradient-to-r from-transparent via-white to-transparent mx-auto rounded mb-2"></div>
                <p className="text-center text-white/60 text-sm">ÉCRAN</p>
              </div>

              {/* Sièges */}
              <div className="flex flex-col items-center gap-2 mb-8 overflow-x-auto pb-4">
                {[...Array(rows)].map((_, rowIdx) => (
                  <div key={rowIdx} className="flex gap-2 items-center">
                    <span className="text-white/60 w-8 text-center font-bold">{String.fromCharCode(65 + rowIdx)}</span>
                    {[...Array(seatsPerRow)].map((_, seatIdx) => {
                      const seatNum = rowIdx * seatsPerRow + seatIdx;
                      const status = getSeatStatus(seatNum);
                      return (
                        <div
                          key={seatNum}
                          onClick={() => handleSeatClick(seatNum)}
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-t-lg cursor-pointer transition-all ${
                            status === 'booked'
                              ? 'bg-red-500 cursor-not-allowed'
                              : status === 'selected'
                              ? 'bg-green-500 scale-110 shadow-lg shadow-green-500/50'
                              : 'bg-gray-400 hover:bg-blue-400 hover:scale-110'
                          }`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Légende */}
              <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-400 rounded-t-lg"></div>
                  <span className="text-white text-sm sm:text-base">Disponible</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-500 rounded-t-lg"></div>
                  <span className="text-white text-sm sm:text-base">Sélectionné</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-red-500 rounded-t-lg"></div>
                  <span className="text-white text-sm sm:text-base">Réservé</span>
                </div>
              </div>

              {/* Résumé */}
              {selectedSeats.length > 0 && (
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur rounded-xl p-6 border border-green-500/30 shadow-xl">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div>
                    <p className="text-white text-lg">Sièges sélectionnés: <span className="font-bold">{selectedSeats.length}</span></p>
                    <p className="text-cyan-400 text-3xl font-bold">{totalPrice} MAD</p>
                  </div>
                    <button
                      onClick={handleConfirmBooking}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-lg font-bold hover:scale-105 transition-all flex items-center gap-2 shadow-lg"
                    >
                      <CreditCard size={20} />
                      Confirmer la réservation
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Étape 3: Confirmation */}
          {step === 3 && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl text-center mt-8">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Réservation confirmée !</h2>
              <p className="text-blue-200 mb-6">Votre réservation a été enregistrée avec succès</p>
              
              <div className="bg-white/20 backdrop-blur rounded-xl p-6 mb-6 border border-white/20 max-w-md mx-auto">
                <div className="text-left space-y-3">
                  <div className="flex justify-between">
                    <span className="text-blue-200">Film:</span>
                    <span className="text-white font-bold">{selectedMovie.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-200">Séance:</span>
                    <span className="text-white font-bold">{selectedMovie.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-200">Durée:</span>
                    <span className="text-white font-bold">{selectedMovie.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-200">Nombre de places:</span>
                    <span className="text-white font-bold">{selectedSeats.length}</span>
                  </div>
                  <div className="border-t border-white/30 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-200 text-lg">Total:</span>
                      <span className="text-cyan-400 text-3xl font-bold">{totalPrice} MAD</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-blue-200 mb-6 text-sm">📧 Un email de confirmation vous a été envoyé</p>
              
              <button
                onClick={() => {
                  setStep(1);
                  setSelectedSeats([]);
                  setSelectedMovie(null);
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-bold hover:scale-105 transition-all shadow-lg"
              >
                Nouvelle réservation
              </button>
            </div>
          )}

          {/* Étape 4: Mes Réservations */}
          {step === 4 && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-2xl mt-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                  <Ticket className="text-cyan-400" />
                  Mes Réservations
                </h2>
                <button
                  onClick={() => { setStep(1); setSelectedSeats([]); }}
                  className="text-white hover:text-cyan-400 transition bg-white/10 px-4 py-2 rounded-lg"
                >
                  ← Retour
                </button>
              </div>

              {reservations.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">🎬</div>
                  <p className="text-blue-200 text-lg">Vous n'avez pas encore de réservations</p>
                  <button
                    onClick={() => { setStep(1); setSelectedSeats([]); }}
                    className="mt-6 bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-6 py-2 rounded-lg font-bold hover:scale-105 transition-all"
                  >
                    Faire une réservation
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {reservations.map((reservation) => (
                    <div key={reservation.id} className="bg-white/20 backdrop-blur rounded-xl p-5 border border-white/20 hover:bg-white/30 transition">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2">{reservation.movie.title}</h3>
                          <div className="space-y-1 text-blue-200 text-sm">
                            <p>🎬 Séance: {reservation.movie.time}</p>
                            <p>💺 Places: {reservation.seats.map((s, idx) => `${String.fromCharCode(65 + Math.floor(s / 10))}${(s % 10) + 1}`).join(', ')}</p>
                            <p>📅 Réservation: {reservation.date}</p>
                            <p>💰 Total: <span className="text-cyan-400 font-bold">{reservation.seats.length * reservation.movie.price} MAD</span></p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setReservations(reservations.filter(r => r.id !== reservation.id));
                          }}
                          className="bg-red-500/20 hover:bg-red-500/40 text-red-300 px-4 py-2 rounded-lg transition text-sm border border-red-500/30"
                        >
                          Annuler
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Étape 5: Contact */}
          {step === 5 && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-2xl mt-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                  <Phone className="text-cyan-400" />
                  Nous Contacter
                </h2>
                <button
                  onClick={() => { setStep(1); setSelectedSeats([]); }}
                  className="text-white hover:text-cyan-400 transition bg-white/10 px-4 py-2 rounded-lg"
                >
                  ← Retour
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Informations de Contact */}
                <div className="space-y-6">
                  <div className="bg-white/20 backdrop-blur rounded-xl p-6 border border-white/20 hover:bg-white/30 transition">
                    <div className="flex items-center gap-3 mb-3">
                      <Phone className="text-cyan-400" size={24} />
                      <h3 className="text-xl font-bold text-white">Téléphone</h3>
                    </div>
                    <p className="text-blue-200">+212 0 00 00 XX XXX</p>
                    <p className="text-blue-300 text-sm mt-2">Lun - Dim: 10h - 22h</p>
                  </div>

                  <div className="bg-white/20 backdrop-blur rounded-xl p-6 border border-white/20 hover:bg-white/30 transition">
                    <div className="flex items-center gap-3 mb-3">
                      <MapPin className="text-cyan-400" size={24} />
                      <h3 className="text-xl font-bold text-white">Adresse</h3>
                    </div>
                    <p className="text-blue-200">Casablanca </p>
                    <p className="text-blue-200">Boulevard de la Corniche</p>
                    <p className="text-blue-300 text-sm mt-2">Casablanca, Maroc</p>
                  </div>

                  <div className="bg-white/20 backdrop-blur rounded-xl p-6 border border-white/20 hover:bg-white/30 transition">
                    <div className="flex items-center gap-3 mb-3">
                      <Mail className="text-cyan-400" size={24} />
                      <h3 className="text-xl font-bold text-white">Email</h3>
                    </div>
                    <p className="text-blue-200">Afafmessak@Mycinema.ma</p>
                    <p className="text-blue-300 text-sm mt-2">Réponse sous 24h</p>
                  </div>

                  <div className="bg-white/20 backdrop-blur rounded-xl p-6 border border-white/20 hover:bg-white/30 transition">
                    <div className="flex items-center gap-3 mb-3">
                      <Clock className="text-cyan-400" size={24} />
                      <h3 className="text-xl font-bold text-white">Horaires</h3>
                    </div>
                    <div className="text-blue-200 text-sm space-y-1">
                      <p>Lun - Jeu: 14h - 00h</p>
                      <p>Ven - Sam: 14h - 02h</p>
                      <p>Dim: 14h - 00h</p>
                    </div>
                  </div>
                </div>

                {/* Formulaire de Contact */}
                <div className="bg-white/20 backdrop-blur rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-white mb-4">Envoyez-nous un message</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-blue-200 text-sm mb-2">Nom</label>
                      <input
                        type="text"
                        placeholder="Votre nom"
                        className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-blue-200 text-sm mb-2">Email</label>
                      <input
                        type="email"
                        placeholder="votre@email.com"
                        className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-blue-200 text-sm mb-2">Sujet</label>
                      <select className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400 transition">
                        <option value="" className="bg-purple-900">Sélectionnez un sujet</option>
                        <option value="reservation" className="bg-purple-900">Question sur réservation</option>
                        <option value="technical" className="bg-purple-900">Problème technique</option>
                        <option value="other" className="bg-purple-900">Autre</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-blue-200 text-sm mb-2">Message</label>
                      <textarea
                        placeholder="Votre message..."
                        rows="4"
                        className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 transition resize-none"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        alert('Merci! Votre message a été envoyé. Nous vous répondrons sous 24h.');
                      }}
                      className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-6 py-3 rounded-lg font-bold hover:scale-105 transition-all"
                    >
                      Envoyer
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Étape 6: Connexion */}
          {step === 6 && (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl max-w-md w-full border border-white/20">
                {!isLoggedIn ? (
                  <>
                    <div className="text-center mb-8">
                      <Film className="text-cyan-400 mx-auto mb-3" size={48} />
                      <h2 className="text-3xl font-bold text-white mb-2">Connexion</h2>
                      <p className="text-blue-200">Accédez à votre compte CinéRéserve</p>
                    </div>

                    <form className="space-y-4">
                      <div>
                        <label className="block text-blue-200 text-sm mb-2">Email</label>
                        <input
                          type="email"
                          placeholder="votre@email.com"
                          className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 transition"
                          onChange={(e) => setUserEmail(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-blue-200 text-sm mb-2">Mot de passe</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 transition"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="remember" className="w-4 h-4 rounded" />
                        <label htmlFor="remember" className="text-blue-200 text-sm">Se souvenir de moi</label>
                      </div>

                      <button
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();
                          if (userEmail) {
                            setIsLoggedIn(true);
                            setStep(1);
                          } else {
                            alert('Veuillez entrer votre email');
                          }
                        }}
                        className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black py-3 rounded-lg font-bold hover:scale-105 transition-all mt-6"
                      >
                        Se connecter
                      </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-white/20">
                      <p className="text-blue-200 text-sm text-center">
                        Pas encore de compte? <span className="text-cyan-400 font-bold cursor-pointer">S'inscrire</span>
                      </p>
                    </div>

                    <button
                      onClick={() => setStep(1)}
                      className="w-full mt-4 text-white hover:text-cyan-400 transition py-2"
                    >
                      ← Retour
                    </button>
                  </>
                ) : (
                  <>
                    <div className="text-center mb-8">
                      <div className="text-6xl mb-3">✅</div>
                      <h2 className="text-2xl font-bold text-white mb-2">Bienvenue!</h2>
                      <p className="text-blue-200">{userEmail}</p>
                    </div>

                    <div className="bg-white/20 backdrop-blur rounded-xl p-4 mb-6 border border-white/20 space-y-2">
                      <p className="text-white"><span className="text-cyan-400 font-bold">Réservations:</span> {reservations.length}</p>
                      <p className="text-white"><span className="text-cyan-400 font-bold">Statut:</span> Membre Actif</p>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={() => {setIsLoggedIn(false); setUserEmail(''); setStep(1);}}
                        className="w-full bg-red-500/20 hover:bg-red-500/40 text-red-300 py-2 rounded-lg transition border border-red-500/30"
                      >
                        Déconnexion
                      </button>
                      <button
                        onClick={() => setStep(1)}
                        className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black py-2 rounded-lg font-bold hover:scale-105 transition-all"
                      >
                        Retour
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-lg border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-white font-bold mb-3 flex items-center gap-2 justify-center md:justify-start">
                <Film className="text-cyan-400" />
                CinéRéserve
              </h3>
              <p className="text-blue-200 text-sm">Votre cinéma préféré à Casablanca</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-3">Contact</h3>
              <p className="text-blue-200 text-sm">📞 +212 0XX-XXXXXX</p>
              <p className="text-blue-200 text-sm">📧 Afafmessak@Mycinema.ma</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-3">Horaires</h3>
              <p className="text-blue-200 text-sm">Lun - Dim: 14h - 00h</p>
              <p className="text-blue-200 text-sm">Ouvert tous les jours</p>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-6 text-center">
            <p className="text-blue-200 text-sm">By Messak-afaf</p>
          </div>
        </div>
      </footer>
    </div>
  );
}