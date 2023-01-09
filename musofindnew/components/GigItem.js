import Link from "next/link"
import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function GigItem({gig}) {
    console.log("GigItem: ");
    return (<div>{gig}</div>)
}