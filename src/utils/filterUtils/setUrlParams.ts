import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

function setUrlParams(key: string, value: string | number) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams?.toString());
    if (key && value) {
        params.set(key, value.toString());
    }
    params.delete(key);
    replace(`${pathname}?${params.toString()}`.replace(/%2C/g, ','));
};

export default setUrlParams;