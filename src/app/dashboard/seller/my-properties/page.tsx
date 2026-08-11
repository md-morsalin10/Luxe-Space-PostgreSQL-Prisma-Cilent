import PropertyActions from '@/components/Dashboard/PropertyActions';
import { getPropertyBySellerId } from '@/lib/api/property';
import { getSessionOnServer } from '@/lib/auth-server';
import { headers } from 'next/headers';


interface AuthUser {
    id: string;
    email: string;
    name: string;
    image?: string | null;
    role?: "buyer" | "seller" | "admin";
}

interface MongoProperty {
    id: string;
    title: string;
    type: string;
    price: number;
    location: string;
    status: string;
    image?: string | null;
}

const MyProperties = async () => {
    const session = await getSessionOnServer()

    const user = session?.user as AuthUser | undefined;

    const rawData = await getPropertyBySellerId({ sellerId: user?.id || "" });
    const rawProperties: MongoProperty[] = Array.isArray(rawData) ? rawData : [];

    return (
        <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Header section */}
                <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-serif font-bold text-[#0f172a] tracking-wide">
                            Property Management Hub
                        </h1>
                        <p className="text-gray-500 text-xs mt-1">
                            Review, edit inventory details, or remove listed architectural workspaces.
                        </p>
                    </div>
                    <div className="text-xs bg-[#C9A227]/10 text-[#C9A227] font-semibold tracking-wider uppercase px-4 py-2 rounded-xl border border-[#C9A227]/20 self-start sm:self-auto">
                        Total Listings: {rawProperties.length}
                    </div>
                </div>

                {/* Properties Table List Container */}
                {rawProperties.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200 p-8">
                        <p className="text-gray-400 text-sm font-light">You have no active listings at the moment.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/70 border-b border-gray-100 text-[11px] font-bold text-gray-500 tracking-wider uppercase">
                                        <th className="py-4 px-6">Property Details</th>
                                        <th className="py-4 px-6">Type</th>
                                        <th className="py-4 px-6">Price</th>
                                        <th className="py-4 px-6">Status</th>
                                        <th className="py-4 px-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 text-sm">
                                    {rawProperties.map((property, index) => {
                                        // Safe ID parsing to bypass build deployment blockers
                                        const propId = property.id && typeof property.id === 'object'
                                            ? property.id
                                            : String(property.id);

                                        return (
                                            <tr key={propId || index} className="hover:bg-gray-50/40 transition-colors group">
                                                {/* Image & Title Column */}
                                                <td className="py-4 px-6 flex items-center gap-4">
                                                    <div className="w-14 h-14 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-100">
                                                        <img
                                                            src={property.image || '/placeholder.png'} // 🟢 Fallback image
                                                            alt={property.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="max-w-xs md:max-w-md">
                                                        <h4 className="font-medium text-[#0f172a] line-clamp-1 group-hover:text-[#C9A227] transition-colors">
                                                            {property.title}
                                                        </h4>
                                                        <p className="text-gray-400 text-xs line-clamp-1 mt-0.5">{property.location}</p>
                                                    </div>
                                                </td>

                                                {/* Property Type Column */}
                                                <td className="py-4 px-6 text-gray-500 capitalize font-medium text-xs">
                                                    {property.type}
                                                </td>

                                                {/* Price Column */}
                                                <td className="py-4 px-6 font-semibold text-[#0f172a]">
                                                    ${property.price.toLocaleString()}
                                                </td>

                                                {/* Status Column */}
                                                <td className="py-4 px-6">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border ${property.status === 'available'
                                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                                        : 'bg-amber-50 text-amber-700 border-amber-100'
                                                        }`}>
                                                        {property.status}
                                                    </span>
                                                </td>

                                                {/* Actions Column (Edit/Delete Client component) */}
                                                <td className="py-4 px-6 text-right">
                                                    <div className="inline-block">
                                                        <PropertyActions
                                                            propertyId={propId}
                                                            currentStatus={property.status}
                                                            propertyTitle={property.title}
                                                            propertyPrice={property.price}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyProperties;