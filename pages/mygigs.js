import GigsBooked from "../components/GigsBooked";
import GigsCreated from "../components/GigsCreated";

export default function MyGigs() {
    return (
        <>
        <div>
            <GigsCreated/>
        </div>
        <div>
            <GigsBooked/>
        </div>
        </>
    )
}