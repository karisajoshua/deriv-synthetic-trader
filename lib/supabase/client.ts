import {createClient} from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://udlwvviwbrzfkczgusnl.supabase.co";
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "sb_publishable_3ee2j4bm9Ql8W5vR06daaA_tpQwJMBt";

export function supabaseBrowser(){
  return createClient(url,publishableKey);
}
