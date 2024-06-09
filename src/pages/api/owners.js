import { owners } from "@/mocks/owners";

export default function handler(req, res) {
    setTimeout(() => res.status(200).json(owners), 3000);
}
