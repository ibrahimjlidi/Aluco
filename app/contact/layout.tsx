import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact | ALUCOA Prestige',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
