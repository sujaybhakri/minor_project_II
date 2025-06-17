-- Sample Roles
INSERT INTO roles (name) VALUES ('ADMIN'), ('TRAINER'), ('MEMBER');

-- Sample Users (with hashed passwords)
INSERT INTO users (name, email, password, role_id, created_at) VALUES
('John Admin', 'admin@gym.com', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 1, NOW()),
('Sarah Trainer', 'trainer@gym.com', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 2, NOW()),
('Mike Member', 'member@gym.com', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 3, NOW());

-- Sample Membership Plans
INSERT INTO membership_plans (name, price, duration_days, description) VALUES
('Basic Monthly', 4999, 30, 'Access to gym facilities and basic equipment'),
('Premium Monthly', 7999, 30, 'Full access to gym facilities, equipment, and group classes'),
('Basic Yearly', 49999, 365, 'Annual membership with access to gym facilities and basic equipment'),
('Premium Yearly', 79999, 365, 'Annual membership with full access to all facilities and services');

-- Sample Memberships
INSERT INTO memberships (user_id, plan_id, start_date, end_date, is_active) VALUES
((SELECT id FROM users WHERE email = 'member@gym.com'), 1, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY), 1);

-- Sample Workout Programs
INSERT INTO workout_programs (trainer_id, member_id, title, description, created_at) VALUES
((SELECT id FROM users WHERE email = 'trainer@gym.com'), (SELECT id FROM users WHERE email = 'member@gym.com'), 'Beginner Fitness Plan', 'A comprehensive plan for beginners focusing on basic exercises and proper form', NOW());

-- Sample Session Bookings
INSERT INTO session_bookings (member_id, trainer_id, session_date, start_time, end_time, status) VALUES
((SELECT id FROM users WHERE email = 'member@gym.com'), (SELECT id FROM users WHERE email = 'trainer@gym.com'), CURDATE(), '10:00:00', '11:00:00', 'CONFIRMED'); 