
// setup supabase client 
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xkyovuxsnqmhuzzbzofp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhreW92dXhzbnFtaHV6emJ6b2ZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyMjk1MDIsImV4cCI6MjAyOTgwNTUwMn0.1HKXx3Z-QZZ7iRwnkWDOU_Lq2o6roWmsdrt_4MzqIhU'

export const supabase = createClient(supabaseUrl, supabaseKey)

