export default function Musician(musician) {
    console.log(musician)
    return (
        <div>
            <h2>
                {musician.firstname} {musician.lastname}
            </h2>
            {musician.instruments}
            {musician.pa}
            {musician.city}
            Rating: {musician.rating}
            Cash Minimum: {musician.cashminimum}
        </div>
    )
}
