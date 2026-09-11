import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Produits | ALUCOA Prestige',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
