import { supabase } from './supabase'

export async function loadProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  if (error) throw error
  return data
}

export async function saveProfile(userId: string, profile: Partial<Profile>) {
  const { error } = await supabase
    .from('profiles')
    .upsert({ id: userId, ...profile, updated_at: new Date() })
  if (error) throw error
}

export async function saveTrackerStatus(
  userId: string, month: string, sipName: string, status: string, amount: number
) {
  await supabase.from('tracker').upsert({
    user_id: userId, month, sip_name: sipName,
    status, amount, updated_at: new Date()
  }, { onConflict: 'user_id,month,sip_name' })
}

export async function loadTracker(userId: string, month: string) {
  const { data } = await supabase
    .from('tracker')
    .select('*')
    .eq('user_id', userId)
    .eq('month', month)
  return data ?? []
}

export type Profile = {
  id: string; name: string; avatar_url: string;
  salary: number; yt_dollars: number; bonus: number;
  food: number; emi: number; other_exp: number;
  pre_invest: number; save_rate: number;
  phone: string; email: string; rem_day: number;
}