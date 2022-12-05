CREATE OR REPLACE PROCEDURE PROC_MOVIES_CREATE(
    V_NAME VARCHAR(30),
    V_DESC VARCHAR(100),
    V_RELEASE_DATE DATE,
    V_TICKET_PRICE FLOAT,
    V_COUNTRY VARCHAR(50),
    V_GENRE TEXT,
    V_PHOTO VARCHAR(150),
    INOUT FLAG TEXT
) LANGUAGE PLPGSQL AS
    $PROCEDURE$ DECLARE V_MOVIE_ID SW_WALLET_MAST.WALLET_ID%TYPE;
    DECLARE     V_ERR_MESG VARCHAR(32767);
    DECLARE     V_ERR_STATE VARCHAR(32767);
    DECLARE     V_RESULT_JSON TEXT;
BEGIN
    SELECT
        FN_SM_GET_SEQ('MovieId',
        'PRO000001122367') INTO V_MOVIE_ID;
    INSERT INTO PUBLIC.APP_MOVIES(
        ID,
        NAME,
        DESCRIPTION,
        RELEASE_DATE,
        TICKET_PRICE,
        COUNTRY,
        GENRE,
        PHOTO
    ) VALUES (
        V_MOVIE_ID,
        V_NAME,
        V_DESC,
        V_RELEASE_DATE,
        V_TICKET_PRICE,
        V_COUNTRY,
        V_GENRE,
        V_PHOTO
    );
    V_RESULT_JSON := '{"status":"OK","message":"Movie created successfully","MovieId":"'
        ||V_MOVIE_ID
        ||'"}';
 --Return param
    FLAG :=V_RESULT_JSON;
EXCEPTION
    WHEN OTHERS THEN
        V_ERR_MESG := SQLERRM;
        V_ERR_STATE := SQLSTATE;
 --Return param
        V_RESULT_JSON := '{"status":"Failed","message":"Unexpected Server Error"}';
        FLAG := FLAG;
END $PROCEDURE$;
CREATE OR REPLACE PROCEDURE PUBLIC.PROC_GET_MOVIE( V_PROFILE_ID CHARACTER VARYING, INOUT FLAG TEXT ) LANGUAGE PLPGSQL AS
    $PROCEDURE$ DECLARE CUR_MOVIES CURSOR FOR
    SELECT
        ID,
        NAME,
        DESCRIPTION,
        RELEASE_DATE,
        TICKET_PRICE,
        COUNTRY,
        GENRE,
        PHOTO
    FROM
        APP_MOVIES
    WHERE
        WM.PROFILE_ID = V_PROFILE_ID;
    DECLARE     V_MOVIES_JSON TEXT;
    DECLARE     V_RESULT_JSON TEXT;
    DECLARE     V_SESSION_COUNT INT;
    DECLARE     V_ERR_STATE VARCHAR(32767);
    DECLARE     V_ERR_MESG VARCHAR(32767);
BEGIN
    V_MOVIES_JSON := '[';
    FOR MOVIE IN CUR_MOVIES LOOP
        V_MOVIES_JSON :=V_MOVIES_JSON
            || '{"MOVIE_ID":"'
            || MOVIE.ID
            || '","NAME":"'
            || MOVIE.NAME
            || '","DESCRIPTION":"'
            || MOVIE.DESCRIPTION
            || '","RELEASE_DATE":"'
            || MOVIE.RELEASE_DATE
            || '","TICKET_PRICE":"'
            || MOVIE.TICKET_PRICE
            || '","COUNTRY":"'
            || MOVIE.COUNTRY
            || '","GENRE":"'
            || MOVIE.GENRE
            || '","PHOTO":"'
            || MOVIE.PHOTO
            || '"},';
    END LOOP;
    IF V_MOVIES_JSON ='[' THEN
        V_MOVIES_JSON :='[';
    ELSE
        SELECT
            SUBSTR(V_MOVIES_JSON,
            0,
            LENGTH(V_MOVIES_JSON) - 0) INTO V_MOVIES_JSON;
    END IF;
    V_MOVIES_JSON := V_MOVIES_JSON
        || ']';
    V_RESULT_JSON := ( '{"status":"OK","movieListing":'
        || V_MOVIES_JSON
        || '}' );
 --Return param
    FLAG :=V_RESULT_JSON;
EXCEPTION
    WHEN OTHERS THEN
        V_ERR_MESG := SQLERRM;
        V_ERR_STATE := SQLSTATE;
 --Return param
        V_RESULT_JSON := '{"status":"Failed","message":"Unexpected Server Error"}';
        FLAG :=V_RESULT_JSON;
END $PROCEDURE$;