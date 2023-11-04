DROP DATABASE IF EXISTS pillow_db;
CREATE DATABASE pillow_db;
\c pillow_db 

DROP TABLE IF EXISTS pillows;
CREATE TABLE pillows (
    id SERIAL PRIMARY KEY NOT NULL,
    brand_name TEXT NOT NULL,
    display_name TEXT NOT NULL,
    is_deleted BOOLEAN NOT NULL,
    has_text BOOLEAN NOT NULL,
    color TEXT NOT NULL,
    img_url TEXT NOT NULL
);
INSERT INTO pillows (brand_name, display_name, is_deleted, has_text, color, img_url) VALUES 
('Gucci', 'Cityscape', true, true, 'mixed', '/images/pillows/cityscape.png'),
('Versace', 'Face', false, true, 'gold', '/images/pillows/face.png'),
('Prada', 'Floral', false, false, 'white', '/images/pillows/floral.png'),
('Louis Vuitton', 'Chic Cushion', false, true, 'brown', '/images/pillows/luxury_shapes.png'),
('Burberry', 'Plaid Perfection', false, false, 'red', '/images/pillows/midnight_gold.png'),
('Chanel', 'Classic Comfort', false, true, 'black', '/images/pillows/peacock.png'),
('Dior', 'Stylish Slumber', false, false, 'blue', '/images/pillows/rolling_hills.png'),
('Armani', 'Elegant Repose', false, true, 'gray', '/images/pillows/watercolor.png');

DROP TABLE IF EXISTS users;
CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL, 
    username TEXT NOT NULL, 
    role TEXT NOT NULL,
    email TEXT,
    is_deleted BOOLEAN NOT NULL, 
    profile_img TEXT
);
INSERT INTO users (username, role, email, is_deleted, profile_img) VALUES
('SysGrlNaomi', 'admin', 'sysgrlnaomi@email.com', false, '/images/users/sysgrlnaomi.png'),
('BeardMan', 'user', 'cooldude@email.com', false, '/images/users/beardman.png'),
('Lily Brown', 'user', 'lilybrown@email.com', false, '/images/users/lilybrown.png'),
('RadiantSmile', 'user', 'handsomedude@email.com', false, '/images/users/handsomeguy.png'),
('SophiaM', 'user', 'sophiam@email.com', false, '/images/users/sophiam.png'),
('JacksonT', 'user', 'jacksont@email.com', false, '/images/users/jacksont.png'),
('OliviaP', 'user', 'oliviap@email.com', false, '/images/users/oliviap.png'),
('LiamG', 'user', 'liamg@email.com', false, '/images/users/liamg.png'),
('EmmaW', 'user', 'emmaw@email.com', false, '/images/users/emmaw.png'),
('NoahB', 'user', 'noahb@email.com', false, '/images/users/noahb.png'),
('AvaS', 'user', 'avas@email.com', false, '/images/users/avas.png'),
('EthanK', 'user', 'ethank@email.com', false, '/images/users/ethank.png'),
('IsabellaR', 'user', 'isabellar@email.com', false, '/images/users/isabellar.png'),
('LucasM', 'user', 'lucasm@email.com', false, '/images/users/lucasm.png'),
('MiaH', 'user', 'miah@email.com', false, '/images/users/miah.png'),
('LoganD', 'user', 'logand@email.com', false, '/images/users/logand.png'),
('EmilyO', 'user', 'emilyo@email.com', false, '/images/users/emilyo.png'),
('BenjaminF', 'user', 'benjaminf@email.com', false, '/images/users/benjaminf.png'),
('AbigailL', 'user', 'abigailL@email.com', false, '/images/users/abigaill.png'),
('JamesP', 'user', 'jamesp@email.com', false, '/images/users/jamesp.png');

DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews(
    id SERIAL PRIMARY KEY NOT NULL, 
    pillow_id INTEGER REFERENCES pillows(id),
    user_id INTEGER REFERENCES users(id),
    content TEXT, 
    rating INTEGER, 
    upvotes INTEGER, 
    downvotes INTEGER
);
INSERT INTO reviews (pillow_id, user_id, content, rating, upvotes, downvotes) VALUES
(2, 4, 'This pillow is the connecting piece of my entire living room decor.', 5, 3, 1),
(3, 1, 'This pillow is so detailed. I love the colors and unique pattern.', 4, 5, 2),
(1, 2, 'Not a fan of the design, but the texture is great.', 3, 2, 4),
(4, 13, 'Chic Cushion is the perfect name for this!', 5, 7, 0),
(5, 14, 'A bit pricey, but totally worth it.', 4, 6, 2),
(6, 11, 'Classic design but feels a bit rough.', 3, 3, 3),
(7, 12, 'The blue is so vibrant!', 5, 5, 1),
(8, 9, 'A bit too plain for my taste.', 2, 1, 5),
(9, 18, 'Love the watercolors!', 4, 4, 1);