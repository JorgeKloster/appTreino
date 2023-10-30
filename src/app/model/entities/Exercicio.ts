export class Exercicio{
    private _id!: string;
    private _grupoMusc: string;
    private _exercicio: string;
    private _series!: number;
    private _repeticoes! : number;

    constructor(grupoMusc: string, exercicio: string) {
        this._grupoMusc = grupoMusc;
        this._exercicio = exercicio;
    }

    public get id() : string{
        return this._id;
    }

    public set id(id : string){
        this._id = id;
    }

    public get grupoMusc() : string{
        return this._grupoMusc;
    }

    public set grupoMusc(grupoMusc : string){
        this._grupoMusc = grupoMusc;
    }
    
    public get exercicio() : string{
        return this._exercicio;
    }

    public set exercicio(exercicio : string){
        this._exercicio = exercicio;
    }

    public get series() : number{
        return this._series;
    }

    public set series(series : number){
        this._series = series;
    }

    public get repeticoes() : number{
        return this._repeticoes;
    }

    public set repeticoes(repeticoes : number){
        this._repeticoes = repeticoes;
    }

}
