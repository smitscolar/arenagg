-- ================================================================
-- ArenaGG v4.0 — SQL Migration untuk Chat Real-Time Cross-Device
-- Jalankan di: Supabase Dashboard > SQL Editor > New Query
-- URL: https://supabase.com/dashboard/project/itxpjxnyhzsexvfvezre/sql/new
-- ================================================================

-- STEP 1: Buat tabel chat_messages
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  tournament_id TEXT      NOT NULL,
  sender_name TEXT        NOT NULL,
  message     TEXT        NOT NULL,
  is_organizer BOOLEAN    DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- STEP 2: Index untuk query cepat
CREATE INDEX IF NOT EXISTS idx_chat_tournament_time
  ON public.chat_messages(tournament_id, created_at DESC);

-- STEP 3: Hapus pesan lama > 7 hari (opsional, hemat storage)
-- DELETE FROM public.chat_messages WHERE created_at < NOW() - INTERVAL '7 days';

-- STEP 4: Row Level Security
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_chat"  ON public.chat_messages;
DROP POLICY IF EXISTS "public_insert_chat" ON public.chat_messages;

CREATE POLICY "public_read_chat"
  ON public.chat_messages FOR SELECT USING (true);

CREATE POLICY "public_insert_chat"
  ON public.chat_messages FOR INSERT WITH CHECK (true);

-- STEP 5: Aktifkan Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;

-- STEP 6: Tambah kolom di tabel teams (jika belum ada)
ALTER TABLE public.teams
  ADD COLUMN IF NOT EXISTS game_id    TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS stream_url TEXT DEFAULT '';

-- STEP 7: Verifikasi
SELECT 'chat_messages table ready' AS status, COUNT(*) AS existing_rows
  FROM public.chat_messages;

SELECT 'teams columns' AS status, column_name
  FROM information_schema.columns
  WHERE table_name = 'teams'
    AND column_name IN ('game_id', 'stream_url');
