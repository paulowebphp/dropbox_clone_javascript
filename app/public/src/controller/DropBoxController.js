class DropBoxController
{

    constructor()
    {

        this.btnSendFileEl = document.querySelector('#btn-send-file');

        this.inputFilesEl = document.querySelector('#files');

        this.snackModalEl = document.querySelector('#react-snackbar-root');

        this.progressBarEl = this.snackModalEl.querySelector('.mc-progress-bar-fg');

        this.namefileEl = this.snackModalEl.querySelector('.filename');

        this.timeleftEl = this.snackModalEl.querySelector('.timeleft');

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

            this.modalShow();

            this.inputFilesEl.value = '';

        });//end inputFilesEl.addEventListener
        

    }//END initEvents





    modalShow( show = true )
    {

        this.snackModalEl.style.display = (show) ? 'block' : 'none';

    }//END modalShow






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
                    this.modalShow(false);

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
                    this.modalShow(false);

                    reject(event);

                };//end ajax.onerror

                ajax.upload.onprogress = event =>
                {

                    this.uploadProgress(event, file);

                };//end ajax.upload.onprogress

                let formData = new FormData();

                formData.append('input-file',file);

                this.startUploadTime = Date.now();

                ajax.send(formData);

            }));//end promises.push

        });//end forEach

        /** método all() recebe um Array de Promises */
        return Promise.all(promises);//end Promise.all()

    }//END uploadTask





    uploadProgress( event, file )
    {

        let timespent = Date.now() - this.startUploadTime;

        let loaded = event.loaded;
        let total = event.total;

        let porcent = parseInt( ( loaded / total ) * 100 );

        let timeleft = ((100 - porcent) * timespent) / porcent;

        this.progressBarEl.style.width = `${porcent}%`;

        this.namefileEl.innerHTML = file.name;
        this.timeleftEl.innerHTML = this.formatTimeToHuman(timeleft);

    }//END uploadProgress





    formatTimeToHuman( duration )
    {

        let seconds = parseInt((duration/1000) % 60);

        // let minutes = parseInt((duration/(1000*60)) % 60);
        let minutes = parseInt((duration/(60000)) % 60);

        //let hours = parseInt((duration/(1000*60*60)) % 24);
        let hours = parseInt((duration/(3600000)) % 24);

        if( hours > 0 )
        {
            return `${hours} horas, ${minutes} minutos e ${seconds} segundos`;

        }//end if


        if( minutes > 0 )
        {
            return `${minutes} minutos e ${seconds} segundos`;

        }//end if


        if( seconds > 0 )
        {
            return `${seconds} segundos`;

        }//end if

        return '';


    }//END formatTimeToHuman




    

}//END class DropBoxController