INSERT INTO users (id, email, display_name)
VALUES ('00000000-0000-0000-0000-000000000001', 'owner@buildy.local', 'Buildy Owner')
ON CONFLICT (id) DO NOTHING;
