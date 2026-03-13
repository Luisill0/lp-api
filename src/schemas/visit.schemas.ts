export const getAllVisitsSchema = {
    unique: {
        exists:{
            errorMessage: "Missing param 'unique'",
            bail: true
        },
        isBoolean: {
            errorMessage: "Param 'unique' must be boolean"
        }
    },
    count: {
        exists: {
            errorMessage: "Missing param 'count'",
            bail: true
        },
        isBoolean: {
            errorMessage: "Param 'count' must be boolean"
        }
    }
};

export type GetAllVisitsQuery = {
    unique: boolean;
    count: boolean;
};
