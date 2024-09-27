import Link from 'next/link';
import React from 'react';

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-2xl font-semibold">Welkom Home</h3>
                        <p className="text-sm text-gray-400">Services de Conciergerie de Luxe à Saint-Tropez</p>
                    </div>
                    <div className="flex space-x-4">
                        {['Politique de confidentialité', 'Conditions d\'utilisation', 'Contact'].map((item) => (
                            <Link key={item} href="#" className="text-sm hover:text-gold transition-colors">
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="mt-8 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} Welkom Home. Tous droits réservés.
                </div>
            </div>
        </footer>
    )
}