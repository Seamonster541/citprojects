import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';


if (Meteor.isServer) {
    Meteor.methods({
        
        getRestData(min, max) {
            
            // Construct URL, and output to console
            let url = 'https://www.random.org/integers/?num=1&min=' + min + '&max=' + max + '&col=1&base=10&format=plain&rnd=new';
            console.log("URL: " + url);

            let result = '';
            let statusCode = '';

            try {
                // Trap non-HTTP errors
                try {
                    // Do HTTP call
                    let callResult = HTTP.call('GET', url);
                    statusCode = callResult.statusCode;
                    result = callResult;
                } catch (callErr) {
                    // Trap HTTP error
                    result = {
                        error: {
                            statusCode: callErr.response.statusCode,
                            error: "HTTP error",
                        }
                    }
                    result = JSON.stringify(error);
                } finally {
                    // Return HTTP result (valid or invalid)
                    return result;
                }
            } catch (err) {
                // Handle non-HTTP errors
                console.log('General error');
                console.log(err);
                result = {
                    error: {
                        statusCode: 0,
                        error: err
                    }
                }
                return JSON.stringify(error);
            }
        },
    });
}