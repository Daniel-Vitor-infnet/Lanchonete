import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tcbwhkdbktgzelgtyzgv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjYndoa2Ria3RnemVsZ3R5emd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4OTA1NTgsImV4cCI6MjA1OTQ2NjU1OH0.sszU27F0KraWQxmrjMKf82WtrQ09BvVlcOu9KEUE5CI' // use a anon key

export const supabase = createClient(supabaseUrl, supabaseKey)
