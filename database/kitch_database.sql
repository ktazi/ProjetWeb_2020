PGDMP                     
    x            projet    13.0    13.0     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16411    projet    DATABASE     Q   CREATE DATABASE projet WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C';
    DROP DATABASE projet;
                project_user    false            �            1259    16452    coms    TABLE     w   CREATE TABLE public.coms (
    cid integer NOT NULL,
    cont text,
    usernam text,
    rid integer,
    dat text
);
    DROP TABLE public.coms;
       public         heap    project_user    false            �            1259    16425    recette    TABLE     �   CREATE TABLE public.recette (
    title text,
    rid integer NOT NULL,
    picture text,
    mat text[],
    ing text[],
    tag text[],
    note real,
    steps text[],
    userid integer,
    nb_not integer
);
    DROP TABLE public.recette;
       public         heap    project_user    false            �            1259    16423    recette_rid_seq    SEQUENCE     �   CREATE SEQUENCE public.recette_rid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.recette_rid_seq;
       public          project_user    false    203            �           0    0    recette_rid_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.recette_rid_seq OWNED BY public.recette.rid;
          public          project_user    false    202            �            1259    16414    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    nam text,
    mett text,
    email text,
    psw text,
    pic text,
    revu integer[]
);
    DROP TABLE public.users;
       public         heap    project_user    false            �            1259    16412    user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public          project_user    false    201            �           0    0    user_id_seq    SEQUENCE OWNED BY     <   ALTER SEQUENCE public.user_id_seq OWNED BY public.users.id;
          public          project_user    false    200            ;           2604    16428    recette rid    DEFAULT     j   ALTER TABLE ONLY public.recette ALTER COLUMN rid SET DEFAULT nextval('public.recette_rid_seq'::regclass);
 :   ALTER TABLE public.recette ALTER COLUMN rid DROP DEFAULT;
       public          project_user    false    202    203    203            :           2604    16417    users id    DEFAULT     c   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          project_user    false    200    201    201            �          0    16452    coms 
   TABLE DATA           <   COPY public.coms (cid, cont, usernam, rid, dat) FROM stdin;
    public          project_user    false    204          �          0    16425    recette 
   TABLE DATA           b   COPY public.recette (title, rid, picture, mat, ing, tag, note, steps, userid, nb_not) FROM stdin;
    public          project_user    false    203   .       �          0    16414    users 
   TABLE DATA           E   COPY public.users (id, nam, mett, email, psw, pic, revu) FROM stdin;
    public          project_user    false    201   �=       �           0    0    recette_rid_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.recette_rid_seq', 61, true);
          public          project_user    false    202            �           0    0    user_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.user_id_seq', 1, false);
          public          project_user    false    200            A           2606    16459    coms coms_pkey 
   CONSTRAINT     M   ALTER TABLE ONLY public.coms
    ADD CONSTRAINT coms_pkey PRIMARY KEY (cid);
 8   ALTER TABLE ONLY public.coms DROP CONSTRAINT coms_pkey;
       public            project_user    false    204            ?           2606    16433    recette recette_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.recette
    ADD CONSTRAINT recette_pkey PRIMARY KEY (rid);
 >   ALTER TABLE ONLY public.recette DROP CONSTRAINT recette_pkey;
       public            project_user    false    203            =           2606    16422    users user_pkey 
   CONSTRAINT     M   ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
 9   ALTER TABLE ONLY public.users DROP CONSTRAINT user_pkey;
       public            project_user    false    201            �     x�m�=N�0���)&B!�	X��lK38��hc;��-���+r&	?��\D��9�
vW"&�8��Y�q䄃w���{
Q:��-I����S�Y������g�����B�l�~|�g�+=uU��cH�����m��L�t���LK��F�����λ������H���5K�L�#n�:����콄��������}�P{!�V��:�nf�Ĩ��a��!�,�h�W�� v��wF�7�V�ҭl��/7EQ|3�      �      x��{��J����8{��TuiDR�,z#zR4��ވF�8���۔NU��,�u��4�_�B��/M:��X>ú���_�y���i�2�=��6��oi�w}[N��{6Be��E?���4/1h�0BB05�1��yN�%��-�	�|��[�|�{~����Ր���O�&�:�C��/��[^vy�Fc���a9����)[�$�g��W!hDM���G�~|���Ѥ�Ҧ�G<��%���#\>�/������5���NK<�ߦ�������w��ː�X㿬��vMؾ�~���cم��~؀���OJ�럇���� =Sڼ&��$�&��G�c���.�_�����+������W�G��b)���}S>�\o�̥��=���s�Wp��E����Y��/LX���M8��/I8����Ti���pJ	�+t� ��L���VNєI�xR,��GQ�@o��W��T�/��@���o�E�[
�v�E�[JW�v=*%���:k�|Vʉf����.l�)<�F|J�bó�\����oQ�I��Q���RN1�ɱ�)BE��d�r���X���G��@�GS�+��֫H�&��/�H��p,����m_�:�n�S,�̉<�l�T� ��]f��U�����ʂ�i�L��)�5��L@c.�褨\�u�ŕ�Z}�8�,�g�A! ��:�jQ,I������4��؝�9*):ᇎ��Z��Ma�aO�\,썖b�	�;�
�K�һ�R9��Jx��in�Y���u��-�cI<�w�{�b�s��u	%�Gs��UJ���Es�{,vm��f�c�	7�T���QW}z�Bcd3���i
M�er�C6Q��nTFA����0k�6���{ RW��{#�:���H��~Zhz�N��AD|�<�-qz�0�=n�'%�V]��eI�W?�/��n�s�Lv��偨�ym�%���8M�$ƻ�Ȟ�����<��*Օ�%��A~hy,č��Ye�	�%�T������c`�Gqv͇�G���BݜnGJM-�k����C}�=[ZRC�1г�c<�b�Z����*�9eE3 ��?o�Nnk��8NÛK�m��c!_'����R<�yRޱ8O5�lx�w7�l�蓙I��׳�BEq8?ᜯH��b'����l��eF��[@�.JF����̶ݟA	��i�n����7�̳��_JU�֒�eN�3��)-�0 r�l��b�z�T�� ?�(�|N������h�7���E��e��)C*/��e��=]P=U�"[����Z2�̭�3:�aY��#w���k��/�,*���Z[Om�)���rx�OJ���z.�lJ�]?^G��T�ҋ�i��-�
�'^M��!܊ft�5�<�����Bm$�?
�)�ĘT��]N��ݨc٬�@�Θ������{���,�T"e}i:�+�H�%�\֑)�Ǒ\��dK���G�o��	3�R��p%�b�zO��c� ��9�S�u�0�G��&A!_u�-kXqa����pX*���İ.F �m�@����V�[�>��$��i��6�l�������rG.w�@��4�D�\�s�`�N�����
���?��@l4��Q*��%�Ъ�89�� �.G��7��̂�٢)v-xbP�lԘPc?�s:��Ž��H:d�k5$n��� *�Қ�N�q�ӝ��[�lT�k@a�}d5[Py�sy	Vt�b�2����>��2-�q�a5~��-9���ѽbchm�{��'+�X�Ɛ���,*J	FH�J��5�4�$��v٧��s�@#PZ�۵�w��I��]�4bUDr(�	'��,7k��)D3>s5�4ͭ���"���]��i�99�>g7����e+��g���m�Y���(bl�%�����G�i��Pt�����C.Ys\1ak�K/.�M	4JO����g���̹{X�,���
A�s�b�i;�2����}\y���B��AJ6�K����V�<��l����u��%^��Ď�3L�����biO=+�~�����G���P}rq$g��#jT�X����4!p�r.���9P��u�Jbssчz�pfϛ������s'L\�J�Zv��b�'�����Ä g�t`e�%mj�k�bDK�]&dM[.���8CO���\� �*Dt�x͟��)$c�@ ���w�<������V���s!uLSN�v��=��i8p:�iJ�)? �0@�[����Il�fǊ�2��b�p�A��қ}��뤭X����]e�!l��t��(ԏ���h�ą2�/��ȣZ����`/��r|���%�%aڇ��v�&/�Y�Vh�����^2 �:���t�Y��
���䫘"L�?�DH�B Ür�T��uӕ���a_���	x�D�OJ��}��ˀN�0��xu�N�8��|�h'�JW?�X��5�$V���ꨧAjB�HǞ&N�ش޽j.Q^���s�t���f����]�.��uk���%9RcQ��9S���w��P��5���s6u����*��/Ͼ<�?wg?Բ�`d簡w������.F������<�w�V�t�,���X�����ƴ��}�غ�ڍ60.�Xk�<�C��X�ZʺU�U�.r)�;<U�|���W��eI���%(���ƙ�v]� �!}Ɋܠ��X�*+�pziޝ��f~N.>�o���{l���>�p�  �%ם
B���Rl�v	���H����pr�U�:dRyEQ`B[-�Q H0��FK�e p��RTU��cqz�>mJ�3�'�mT��w�u��ZɊ���#v�����	��ɬZ��N<�B+�F!��?�M.EK0{7��U"�<w�cwR,���X\?҂��|��U�_爧V��B =����q��_F���~<P�
����Ҁ�����{���zU-��07>�{��^f:�4�ے�"�l8�݅����f��&xpbl�Ptx����\�`8�^M'`���k&����\,\PЋ%k]�2��Hui�e.�W)2�3D���m��Z
B;:�Ig�m����M�ZN���z�Ul��A!V�	��蘃{ �~>|h�i#|,d+�уX�w�
X2g����ǲI#����,�m]b4}	~�r+w�I�yYl�>T�]�صn7��^C|b��$I@樱�X�I��öJ�'��iٞD,�S�Q)�C���9��(�v�=7
�.[{��D�[p���Z�|u,��C��b^qՈ Ɯ�,�(6g=�"�M������teHE'D/�"�ͨf�;�aNᮀ�Uj��vw�UO�nM�U��=���	d[�u��c[f��8��P�&U�qFo�k�7Ee0��IbO^��d�u�$*��<+Dk��c�Y*� �8��P�nږ��g����d��x�/� ӏ�B"�Tx<<�l͍�.��Pek��n�J�Xj$�i�Lڏ	")Z�����c- 3苤��Cx�?ߓ�}*)�Mep���d��x�1]��c:�~��	��F�;Wi8�#��X(�qyt^
�l�c��c�^�or�4���A.�:?�u�_+��F�WlB�����?�1W�i%�� ��g;�����f78q�N��`]6���T�#)���TZOϧ6��
�wX{>�^ִ�Q�8�vB�X��+� 2�+E�O(�fR�$O���KJ��ľX�� 'L�m��$��#��QU*�<����2]�F�|~��2u�#c<<Q!w�.���B�7�(�t���Ќ�a'����A�У�<'.? �@��%��G�[䦦���g�U�\�5��xB_nP�����n�v�>XC}���n!�C|t3�t�|�Hw�)�P4�D�1��� �#�#$?N���!�x���$j�A�b������bS�U�U]�"'16R�mZ�ö;�)�
(��u@zԵ����k5�ތ�d�!;���ev�����xط��~��8K4n.�]���08��� ���?	�PWg��b�Ü>���O�@=����P`E�7M+�e�r�E$d�<��ܶ��+��L�1s�����^^G�ɒ���X��<����`7�g�
��z��"}W���tH    $ �m<��wX}�7���9ct�o)��jm�
l��9�ݘ�BS;���(�?�ϩ=c��IA�����_"�sR��=V���Ww��UP��m�A��z\��ީ���Ѓ�܋�#���kH$�rn�|z�m���
��N�����UE������w[�-���z�:�3u��t��v���G<GG�a�<��xn�~i�3ziC�-*��:�Nc�@�k����n➳q�%�(�z�M����	KD��eh|6�(������I)v*"S�+ah�p�Ma�XR����K�;�k�{��b�p�r>oc0lQ$wBz����A(�뚀�݈�#�ъ%��P��c���#W��"
�Wm9�Nu��<�A�Kk�^�+��0�H��>6uW]��k�s;H?�f2� ^b�b�b
9G�rwx	њ�f��8����=�����R�i������vxn���!`Q������l_�����iO �:.�@�
�ӵL( *�N��b��w��E]­D)���$�%�����7-{端f<,^�#�M���$Uc0�Gܝ.��&B��m;m����Js�� �[M�L�#G_�u�<Y��S�VZ_;a0�si��{�p�$��V�\#CV;�ݠ�gˡc�2�� ��⺸s��J,�Ԭ�(���7����B,u`�z�I�$.[���"��rRY�����;&��}� �S�bڧ���[��{d�t���[3�s0�Y�͹���}|C(�i�WX*/�F��ZOd^�yܸ���&�߫�I��(���\�[qd0�n���jxV��f�2�W��v�%�[���`I $K���)vŪ�p��j�Q��v�C��+Oɬ1�����#��6l����e�3��V²�S��\���s�3��gc��AaU�~[Xg9�*G&-��&��g�N�d��5'�Ý I���rv�L$.�W�(ެ���I%�~qA�}��&��%_��,�Q��X��kȱ�4_p2����q���_kf�����=�I2Y8�	u����,�M�e]�7b���8D.j/gy�dvn���)��'(m��mN�;lj*4ˇ���j_�C���('d����h��&?(N|u�|[���X������C��s~F��c1�.�`[)��]��
G�{rYS �9�@�����Л����4��s�BH1�N����+3|��=�tD.<��R�䄫L!�����ƌ}r�g���ys��og$"��״��-��`�B4�~��8��������#��σ�M���!F��S����sb�z������=�r�<a
&3����e�"��� N/7 �{l�zc�R�z����I1�!E`L�'��@�2�\nz���UO8�����Z�]#8q*,aCA�!�C^��hmmG�K�/'�]��G5[�����p�8Ȇh�L�0�y
+T[�[҇��+I��6��
�f���~Zn�T��HL���8vdsOZ���>���N�͂|l����=�CK�q�!&���O������O%ͥ��Kx�X�󢗇�x�GGU�u&ko�\l�e1��Zh�9����S�>iR�@�G:�*�Ѻ_].~�3�7��9�q m����lkI))2����|���6Y���1o�Hm����y6Z��4�$��v�/��5�I_��g��&�
���{������OO_�����hSA��j��Kx����u\׀��'�1R��ì@ ǔ�y./��3}b4v�.Xt_��Q�c悆L���$6b�]@LI�)�ѥPoJI�,4��N�|�HZ��SQ�b�1�3���.�h_�ԓ��2������-ݣsR�(āTrA;̐o��?8&m'���ʉ���8��QnR��[Ң ��#+���R]�z�|*s=GӐ���3�a�!?����sr��޵rl�DQ;D	��=ICǌ��:n#斘��,Nܥە�kʢ��8�|�K"��~h�OG\�0�rKP��u[��\/�M˳���ۉ�|���I��Ds��h���)�����Q���pMl��"����#BF�G]��3��e������ZÆ��T/�]��-k'eQ:�H�
�A6�a�V�	��K��J�@j�i�8��T��^��,?&��B�A=̈�-��<��������U�;#A�_L@�ޥ�������T�dGf�P��B��
��7�eO�=Y2w�9`��t3fy�V������~&��;�)��.�������
g<7qTr�u��!��P�ݓ�ˏ�9��dxP=�#�-i�]���[\�7bdR]"-��j*��Β����OW9�{v��Ή��gxF�;a?�\��7�n+9e��7|�Bf��_�3�F�s���9���;�~�ȩ��©	��ez?��*Z*�ѵ�_�&�GW)�-'�3��ɬa� �� ���:A�/|o�E�i
���>ؐv��b��v��4d�;r��Ĳ����`?��qyڎfK�;�tպ0�Q��5�Rh�A��i���X`��d����j� ?�F�c_��ş۬��<gi�֒�〵e�����L��ÃgqWo�L6W� Y����!�'+�Lk�lO���s";�c[� 2�#��:�f9'u�A�כטΕ�ˣ�Y��C��"#�e4AaDx�(@>�X���A;�0ZJ5� D���E��x^���{�z^����.���
9/Q�$�)�/g�]�l����qn}m,5Y_y�Y����Қ�2f�8��+���-Z%��oq����;[����;p�q9��I��R�~7Qo#����	U������;b|����Gjh�ó��xF}�2�&8�pk�۞�F�N�X��p��a�ߕ����%��O�9k�m���0`���*�m���A)����,��
���E���a;CoW8�x5��t���.����"�6�<Gqw�E�%n��� �,���ml��6��H�I�|���j�U'�Z 	q��3���)4�=ސ}#�&Lc�6�Tr�̧�P��+o�~�,���B��B�`����,A�/��k�ş��)��2��2�V�ݴ�Ys�X�-O�`�17�P)��@��Z?;���8�t����vw��\�qp�>�6��+��'�Z(\L�~lpJ��l���x0�6̋���꒚`C	��C]�3K6�X�ȍsl�9j�ARN �{��xrs�6�i��F�5��,�Ss�v��1PVN=n*=;���qy
�-�DI�գ��=�/wA.M˴mI#h��ۥ�xue��v1Ͳ���9Р`)�@7F��C�,g`�b��3MZ3�i��\���<i�����`�5oc�`[�CM� ����'U.���~<���\VH�(����M��z��[��Oj��!8�gy���I��<M�^�+AƼ:.�C��΄���?�'>�#&�>��N�tHn�+�M�w���rh1��D�H����R׼�X��Ȣժ3N,L��C���Z^s:V��x���DN�0�nZ��e`.�[��b�T&�dMbn`��Τ����sຨ~*��d��z���^���%,��cj�2Ḝ.�Q����%�x������չ
,^g �4�����L\�+�=nW���w�;X�>�$��r�5��Y��rD�Ob��{/K*r����9��K0�4�>&�(Cl{*�fB��T�$<Yf�>������J-��?I$HJ��W��3�D2��b�U���h�N|�)���GI�T��L�󀟞�5��Q��ZtQ��յ:뉵�PS���^��\ʪ5�sr��:Ϲ}GA�e��4:��#z����!�aP���ᆳ84�~J��������:�J��J�"�I��d�F:�R�I�YcM��T��Kᦫf�*�)���Z\	rp�;�fK�Ulj�|�8)Q��15(dl��]����H� G4_��� B�?�������t? K�Zb�.��tk*���N�#�W[���&�=��tN�*Iر�A=���1VX����J>8�(�ܡ#�ye?z�C+���>2���N�IFKa!'�#
wr�g�,�0�-��-➭R�uU�H �  m��ڭ`��*&%W1�\�n;ꭝ�����!uhqa˳J�y<�um~6,�O�ꦄ�(�N<��t��`��^�w����Ѫ{����x�cF���>+�te3�:2OYB��]"S5�C��M3�W� �hr�k�� 6e7�ZO�_޲��+ )�X�l9�ᔅ(u ]��8��4{�K�r��g��&��*�^
�7K�ٹ�`j���;Q\�7/�\�JZ0�S������ow��eE﷬���|nK(���fA��.�n�<�,�\N�DMqW�,��"n��<\$w�a#7�{f7��й��/�>� G*��k��3�����5ꛯm����Kޅ���FͫT�U\��������ݱ�S٥�}����%{��"8���e����'��x���6�1�q�*�}�>��������i��?��!�9�~%�5���m8��8���A��#�7�MXίr�8�ӯI�*՝_�����UE��\��?Kn�\����T|��N�������5� .� 3��5>�氋����`@���i>~/^���G�N�ȯ��O}/��ɉ�u�`�[/Y�ix����b�_ЯR��4\����� ��i��,o ^�>�W��?
��c:�c8�}���N��E:���O������� /_}7�%�1��pɲ�	/`} '�-�D�LH��?�!��w�3x���_~VR�� �����Wu4x�E/N�G���W��K���_�2���`	�����,�/ʮl�W�<���0�dP���$K�@2�D�,Ja�`!���?k����~y��C� ����e޿ ��їݧ��B�#d�[��X�8y�,6�^h��ŏ�cz�O�y�]X^t��/�޵�����x@�k�%P�C��������7��~��P.;�& �U|�9���J��K��
�z����7����@ ��C���z�w��{���|/��_��@l�j��'� �^���G؆ ����SR��ބ߾�o-8O����>�6���0A�k��1|�� ��}�o�9���-.J`c��r�v/j����u�h_�z�/�{p�O���RE �������~_�m����̻��eG]a�~°
�*͟3��xY���~�O]{/�O`���[r#`X`�����'U?���q����0�ư����(������/m�/o��p��X׽.(|���� q?�����; n��[~���o>ob��T6�oE ީ/�}��W�u��a����`��P���`����;�s��O�l���`��%�n��C�th@���˥�Q��|��Վ�|����琯�+�x��-|
�돋��H����["�����76������fmLo������@��$��o�w@N�U��
��ֿX�Iԧ�M����)m������_?~t�}��O��R�	���o�@�#����F�����L_��}�'�o�8�W���tc@���6�s�{�J`so2��IO��]�
&�]���5��s�~}80�Ĺ9�`��%��!�/7m~A�ۧ�� J_'�̵��f���A�0o�3���|7gL�]�_:����ѐ}�u?kz3P�f���PP4A��|?�2I�?~ڵa��2�~��_�V+�#I�x��G����W�\<ۗ�������V���[��[G���#���ם��?!������O�����Z�گ7v~�lzagz����8��S^��g���.Ӌׯ��%��÷��� >���	��}�
 ����_��+��ӗя����ǳ�i�8�����v��]��h�sC ��7B�?y�!��%K � Q�i�}`�A�5��X=�c?��o/
���x�����D�` [6�'(?�|Z����;���`M[rM�w3�gp6��v�rZ��Ӌ�|e����;p��������_���      �   �  x���_o�:��ɧ�E��0 �Z	!��.KH4ir�76�d�w?��J�9ӹ��_Y��{���㿇�� ��Ý�λ�s�h�dGO3Y�:>���^.��aѮ�I""9�4��瘆^.ĜS��,�$&���qL��h� '8J�Hp b3���(Z�j]�I�4��ƽ��띗�(�Ba�6Ǵ��
o�ma���p��h.�i�cD N�G�汬�l����xԫ��3���UїE�@������z�nJ��(������� L_���ɘ��N�����&y�ǶL���4&���^h��Ldq��ӷ �O�Ѓb(��5U >����a19v�����V����u��͙��BWk?��ғ�`�bj`Y��7���&0��y�
~y[I��o�wd�v���ì|�Y�[�|P��>akm�R\��8���ڍO���Х=%��@�g�����PPH��� ��u�R'K��u�id��3�q!�Y�"X`�=�c���"��E5ǶM���8����{�WΒ�71Wb�.�����h���f.Q0�Ky�˚+�KU:��Fлj罼���*�LVC'�80��X]Ug�{�uw@�}j䞳���<�՟��R�y�>���[�	�,r�K8ɲ&Bc��	)(ko��#?0F�Lf����t����O�����Z�jv���V�R�����z�z\�O��A�����:R'b�������v�]��.Gf1�}�/�ۏ�=��R�������     