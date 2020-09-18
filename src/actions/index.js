//Action for user role change
export const userRoleChange = (role)=>{
    return {
        type:'USER_ROLE',
        payload:role
    }
}