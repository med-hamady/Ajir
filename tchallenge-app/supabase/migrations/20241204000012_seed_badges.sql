-- Seed initial badges
INSERT INTO public.badges (name, description, image_url, requirement_type, requirement_value, requirement_category) VALUES
  -- Points-based badges
  ('First Steps', 'Welcome to TChallenge! Earn your first points.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoAdg_5mySRSSvNGDJ2NttFYsb5q71DMWSuJxXsw-DSkxAkTc-WPZFaVRSzNr-o83yqb7e72fZSHZGfnLKCv35pLt_Fnf_wv-d7htujvbjUCcQf-fHzsKNwB833DPRs5153Or731EsaD6NKWumNb-92l5AfHnd4A4RjfzpXYl5lJmHklLevHa0a2mvzoG3meyA01Z_9UDMh_kV4uCxxxjWHS1V7UMY1CXh0SGOLV1p8yfwCePnYNcYVfJz-wsrZEEhjXctJ55Znec', 'points_earned', 10, NULL),
  ('Rising Star', 'Accumulate 500 points.', NULL, 'points_earned', 500, NULL),
  ('Solidarity Champion', 'Reach 1000 points!', NULL, 'points_earned', 1000, NULL),
  ('Elite Contributor', 'Amazing! 5000 points earned.', NULL, 'points_earned', 5000, NULL),
  ('Legend', 'Incredible! 10000 points achieved.', NULL, 'points_earned', 10000, NULL),

  -- Challenges completed badges
  ('Challenge Starter', 'Complete your first challenge.', NULL, 'challenges_completed', 1, NULL),
  ('Challenge Enthusiast', 'Complete 5 challenges.', NULL, 'challenges_completed', 5, NULL),
  ('Challenge Master', 'Complete 10 challenges.', NULL, 'challenges_completed', 10, NULL),
  ('Challenge Legend', 'Complete 25 challenges.', NULL, 'challenges_completed', 25, NULL),
  ('Challenge Hero', 'Complete 50 challenges!', NULL, 'challenges_completed', 50, NULL),

  -- Category-specific badges
  ('Solidarité écologique', 'Complete 3 environment challenges.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuANhoVnn-It5soFBik7nRmtdUG8d0prj7c7kw4qgNbQ2pBx_JXX9sJ_rbKNqsSW6WrsAPtl2Cs0ZasByMst6a-c_06WY5JlskpM856pOUOMUhjRIKUT0PuqUaHUbIaCjNjorP_tW9WPzcv_8TAHVp7Z5Johza3iwsP4-HCkfiTLbEQE6I68Qib2JpMr94tGOCPCXKyDBd8vdJgiNbPbVrWdOVh5kiFwLS4f-Um3O5q2jVAfIQcO9UXNUKmWd2s4A1K6c9Gu0JOa7TI', 'category_specific', 3, 'Environment'),
  ('Champion de l''éducation', 'Complete 3 education challenges.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuABYkfkTgwWFBI3XKs7OqMoGQCZfQAfremYuqATp5sIS6nCeJRG_oeEHsKYLABHvBK9nN5JCKeFALZ309DAnQOeXJQ5wfvBckaCwgoC_zgEmdhzns5E1y7_dQkjAP8pvJCt80O3sArD03gmDtMJxd9TIUtbdGAHGJYq6l7CmLj0soPRfQpX0of3FuTjXOljUCq0G6BtwFUMPS4adARLccoDVQHWWM29hA_tHvkFREnZEJOZqz7OOrqdtSUm0u8ArE7M89ge5RYTuW4', 'category_specific', 3, 'Education'),
  ('Community Helper', 'Complete 3 solidarity challenges.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlRookJWifC2YjsVfwN50NCX8Qh_tyVU_WGR7N5tghQPLKvySFMJOHGW6SoCWnEcFvIVgUiRYw02Ox9F8XgLiRTU54qZC7qXUwozYUd9Hqs4M45UaInZe6Y3FOm5hMA72CckS9y2we5c8PnsGI0xIwh1r5QDXX5mhgS9qkYKfW1No7KXXHW2iSmPlN-QTRPplCZe4q7TroQnOaTg0oDrsONzColC7zeXEQSSu2qeiBLwi0ZfRwCP53JRiTJBLxdOLrXUv6KfpHzvg', 'category_specific', 3, 'Solidarity'),
  ('Health Advocate', 'Complete 3 health challenges.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFS82NDDT2pIORuL0ItJZoaT5-afiRZsxFAcg-0P_r5041QjZ2raSVVtpa-1ZzwKU_Bduvs7oryeMlAnJY2IeDIQcM9zeEXha-tQ41Il27vxmr2AQboXkfmWNNk4OmEoZjLR-fa3roIzmyOZJ-Be3SvC4PgL4UWJmzrLJMUSmjLYjjkTZ00trJMBE70r7nEZ0SQzME37p4UVHumahb71-z84fyuc20SV3Bo0782I3z_vEOxnPfXFH7FKNVdNyZU55dylQIn-mvLow', 'category_specific', 3, 'Health'),

  ('Eco-Innovator', 'Complete 5 environment challenges.', NULL, 'category_specific', 5, 'Environment'),
  ('Mentor Master', 'Complete 5 education challenges.', NULL, 'category_specific', 5, 'Education'),
  ('Animal Ally', 'Support animal welfare causes.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCX1qbIXnshFv3_i7z8tx8nVVePi1euYQ1kPgncCyuxp5s_tDx7P8ecO9V1BvxFvyUd2ahX7ysjQlY5kx7E1dhjZTNNwAqy4IY0kSDICoW_TwsUcrwjLzsMLgiT8ePczFbOKI6wmRqh4FcWPtdw0XrXZlL_VtNqATTk5PMzElbYVB6IFxsqA1r959TqUlnAwG_jCT3fplnDaOyz-6TgV9XpUI7x4zxEMJsGABtFg_kZlK59PCCxRO_-M1udBgThc8ExX1pQ5KNQ6e4', 'category_specific', 2, 'Environment')
ON CONFLICT (name) DO NOTHING;
