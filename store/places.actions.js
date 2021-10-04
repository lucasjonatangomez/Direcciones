import * as FileSystem from 'expo-file-system';
import { insertAddress, fetchAddresses } from '../db';

export const ADD_PLACE = 'ADD_PLACE';
export const LOAD_PLACES = 'LOAD_PLACES';

export const addPlace = (title, image) => {
    return async dispatch => {
        const fileName = image.split('/').pop()
        const Path = FileSystem.documentDirectory + fileName;

        try {
            FileSystem.moveAsync({
                from: image,
                to: Path,
            })

            const result = await insertAddress(
                title,
                Path,
                'Address',
                10.45,
                20.90,
            );

            dispatch({
                type: ADD_PLACE,
                payload: {
                    id: result.insertId,
                    title,
                    image: Path,
                }
            });
        } catch (err) {
            console.log(err.message);
            throw err;
        }

        
    }
}

export const loadPlaces = () => {
    return async dispatch => {
        try {
            const result = await fetchAddresses();
            dispatch({ type: LOAD_PLACES, places: result.rows._array })
        } catch (error) {
            throw error;
        }
    }
}