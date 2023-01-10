export function SideBar({ createdClick, bookedClick, personalClick }){
    return <div className="sidebar">
    <ul>
        <li onClick={personalClick}>Personal Information</li>
        <li onClick={createdClick}>Gigs Created</li>
        <li onClick={bookedClick}>Gigs Booked</li>
    </ul>
    </div>
}