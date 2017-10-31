import {Command} from './model/Command';

export default ({ajax: ajx, baseURL: burl}) => {
    // const ajax    = (...args) => Promise.resolve(ajx(...args)), baseURL = burl;
    //
    // /* the interface to enable communication with server */
    // const backend = {
    //     /**
    //      * @param obj - player object
    //      * @returns {Promise.<*>}
    //      */
    //     async commit_new(obj) {
    //         return await ajax({
    //             url:    `${baseURL}/${obj.class}`,
    //             method: 'POST',
    //             contentType: 'application/json',
    //             data:   JSON.stringify(obj)
    //         });
    //     },
    //     /**
    //      * @param address - player address
    //      * @param obj - new player object
    //      * @returns {Promise.<*>}
    //      */
    //     async commit_update(address, obj) {
    //         return await ajax({
    //             url:  `${baseURL}/${address.class}/${address.id}`,
    //             method: 'POST',
    //             contentType: 'application/json',
    //             data:   JSON.stringify(obj)
    //         });
    //     },
    //     async commit_command(command, player, handIndex){
    //         let response = await ajax({
    //             url:  `${baseURL}/${player.game.class}/${player.game.id}/${command}`,
    //             method: 'GET',
    //             contentType: 'application/json'
    //         });
    //         if (command === Command.HIT){
    //             player[handIndex].addCard(response.card);
    //         }
    //         //Save player
    //         let response2 = await ajax({
    //             url:  `${baseURL}/${player.class}/${player.id}`,
    //             method: 'POST',
    //             contentType: 'application/json',
    //             data:   JSON.stringify(player)
    //         });
    //         //Check response2 for game status/results
    //     }
    // };
    // return {backend};
};

