import { branchStorage, getBranches } from "../../../stores/cinema";

export function load({ params }) {
    return {
        id: params.id,
        type: 'branches'
    };
}

