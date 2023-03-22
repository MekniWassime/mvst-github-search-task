import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { RootState } from "../../store";

/**
 * This hook enforces that the url params for the /repos/:user? path always has a user param.
 * If the optional user param is undefined fill it with current logged in user automatically
 * 
 * The goal is to allow the user to easily copy the link and share it with anyone
 * 
 * If url params are not enforced and the user is in /repos with an undefined user param
 * They would be able to look through their repositories but they wont be able to copy their own link
 * from the url bar easily and share it with others
 * 
 * @returns The user that we want to query their repository
 */
export const useEnforceUrlParams = (): string => {
    const navigate = useNavigate()
    const { user } = useParams()
    const currentUser = useSelector((state: RootState) => state.auth.login);

    useEffect(() => {
        if (user === undefined)
            navigate(`/repos/${currentUser}`)
    }, [user])

    //null check operator used here because we only use this hook when the user is logged in
    //and current user always not null in that case
    return user ? user : currentUser!;
}

