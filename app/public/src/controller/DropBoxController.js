class DropBoxController
{

    constructor()
    {

        this.btnSendFileEl = document.querySelector('#btn-send-file');

        this.inputFilesEl = document.querySelector('#files');

        this.snackModalEl = document.querySelector('#react-snackbar-root');

        this.initEvents();

    }//END constructor





    initEvents()
    {

        this.btnSendFileEl.addEventListener('click', event =>
        {

            this.inputFilesEl.click();

        });//end btnSendFileEl.addEventListener


        this.inputFilesEl.addEventListener('change', event =>
        {

            this.uploadTask(event.target.files);

            this.snackModalEl.style.display = 'block';

        });//end inputFilesEl.addEventListener
        

    }//END initEvents






    uploadTask( files )
    {

        let promises = [];

        [...files].forEach( file =>
        {

            promises.push(new Promise( (resolve,reject) =>
            {

                let ajax = new XMLHttpRequest();

                ajax.open('POST', '/upload');

                ajax.onload = event =>
                {
                    try
                    {
                        resolve(JSON.parse(ajax.responseText));
                        
                    }//end try
                    catch(e)
                    {
                        reject(e);
                        
                    }//end catch

                };//end ajax.onload

                ajax.onerror = event =>
                {
                    reject(event);

                };//end ajax.onerror

                let formData = new FormData();

                formData.append('input-file',file);

                ajax.send(formData);

            }));//end promises.push

        });//end forEach

        /** método all() recebe um Array de Promises */
        return Promise.all(promises);//end Promise.all()

    }//END uploadTask






    

}//END class DropBoxController