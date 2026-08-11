
import { getSessionOnServer } from '@/lib/auth-server';
import BuyerProfileClient from './BuyerProfileClient';


interface AuthUser {
    id: string;
    email: string;
    name: string;
    image?: string | null;
    role?: "buyer" | "seller" | "admin";
}

const MyProfile = async () => {
    const session = await getSessionOnServer()

    const user = session?.user as AuthUser | undefined;

    return <BuyerProfileClient user={user} />;
};

export default MyProfile;