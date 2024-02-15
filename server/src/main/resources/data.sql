insert into arts(vendor_art_id, category, title, start_date, end_date, actors, rate, location, poster_url, info_urls)
values (98765001, 'SHOW', '상실의 징후들', '2023-06-10', '2024-08-31', '', 0, '뮤지엄 원',
        'https://cdnticket.melon.co.kr/resource/image/upload/product/2023/06/20230620103210bee63153-793b-4cee-ae85-6434493e90f5.jpg/melon/resize/180x254/strip/true/quality/90/optimize',
        'https://cdnticket.melon.co.kr/resource/image/upload/product/2023/10/2023100510461490f568d9-31a7-4ab5-acb2-016901b255f2.jpg/melon/quality/90/optimize'),
       (98765002, 'MUSICAL', '뮤지컬 〈헤드윅〉', '2024-03-22', '2024-06-23', '조정석, 유연석, 전동석, 장은아, 이예은, 여은', 17, '샤롯데씨어터',
        'https://cdnticket.melon.co.kr/resource/image/upload/product/2024/01/202401261731424a9c5dc2-6f4e-4986-980f-1027b126696c.jpg/melon/resize/180x254/strip/true/quality/90/optimize',
        'https://cdnticket.melon.co.kr/resource/image/upload/product/2024/01/202401252210240cf98f9b-3145-4478-b5a6-78bb51a51b6d.png/melon/quality/90/optimize, https://cdnticket.melon.co.kr/resource/image/upload/product/2024/01/20240131155225201f5a65-7847-4478-b356-b63474ae10bd.png/melon/quality/90/optimize'),
       (98765003, 'PLAY', '［서울 대학로］연극 라면', '2023-03-20', '2024-02-25', '', 12, '해피씨어터',
        'https://cdnticket.melon.co.kr/resource/image/upload/product/2023/03/202303171047117fdc060a-8274-4ab8-ab99-990489e4f652.jpg/melon/resize/180x254/strip/true/quality/90/optimize',
        'https://cdnticket.melon.co.kr/resource/image/upload/product/2023/12/202312110910592027af30-1a56-47ab-b5b2-8d4e2f808c89.jpg/melon/quality/90/optimize, https://cdnticket.melon.co.kr/resource/image/upload/product/2024/01/202401021424523977b6bf-0971-4de2-94ea-5289318e0d7d.jpg/melon/quality/90/optimize, https://cdnticket.melon.co.kr/resource/image/upload/product/2023/10/202310100905085286b3fb-45d5-4981-b859-4f65218dbf36.jpg/melon/quality/90/optimize');

insert into shorts(art_id, media_url, type)
values (1,
        'https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/2YQ4/image/dhMK4SAz8Z8zioLbl16pSDvsYR4.jpg',
        'image'),
       (1,
        'https://image.kkday.com/v2/image/get/w_960%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_35943/20230622023629_Dl3aG/jpg',
        'image'),
       (2,
        'https://lh3.googleusercontent.com/proxy/hKWfK7J3qEV8w76QdaZVV907_9bUV-VTtxLwA9Pfe_LrM0lhHzba0Bsy-JjMlAVbuZEKI_SZUP3hIbYxERWR3ws4T5M_Bh1-VU5Rd1SrKfCh1lpyVv-Ep6phChGaiQ',
        'image'),
       (2,
        'https://lh3.googleusercontent.com/proxy/hKWfK7J3qEV8w76QdaZVV907_9bUV-VTtxLwA9Pfe_LrM0lhHzba0Bsy-JjMlAVbuZEKI_SZUP3hIbYxERWR3ws4T5M_Bh1-VU5Rd1SrKfCh1lpyVv-Ep6phChGaiQ',
        'image'),
       (3, 'https://www.seoulgyec.or.kr/uploads/post/2022/10/024d3799904ea126f7eab0761d6b352a.PNG', 'image'),
       (3,
        'https://lh3.googleusercontent.com/proxy/RTJtRdo7dIUh5Tg2ntsOHrV62b17HkveSrORvcjbZxFKHW6CGvdiPrmHPjOnYD6-2n5IxVkBmEOrUsDO_JM9bMnAxOPKvzNjK5XOnrg',
        'image');
