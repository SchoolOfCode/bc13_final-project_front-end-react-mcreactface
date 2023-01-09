import Link from "next/link"
import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function GigItem(props) {
    console.log("GigItem");
    return (<div>{props.gig}</div>)
}