export class Staff {
    static allowedRoles = ["I.T.", "P.M.", "R.H.", "Admin", "None"];

    constructor({ id, nombre, apaterno, amaterno, designacion, telefono, genero, estado, correo, password, rol = 'None', bloqueado = false, intentos = 0, imagen = null, currentSessionToken = null }) {
        this.id = id;
        this.nombre = nombre;
        this.apaterno = apaterno;
        this.amaterno = amaterno;
        this.designacion = designacion;
        this.telefono = telefono;
        this.genero = genero;
        this.estado = estado;
        this.correo = correo;
        this.password = password;
        this.rol = Staff.allowedRoles.includes(rol) ? rol : 'None';
        this.bloqueado = bloqueado;
        this.intentos = intentos;
        this.imagen = imagen;
        this.currentSessionToken = currentSessionToken;
    }
}