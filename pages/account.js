import { AccountPage } from "../components/AccountPage"
import { useRouter } from "next/router"

export default function Account() {
    const router = useRouter()
    const data = router.query

    return <AccountPage session={data}></AccountPage>
}
