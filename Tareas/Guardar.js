import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';
import { Redirect } from 'react-router-dom';

import * as tareasActions from '../../actions/tareasActions';

class Guardar extends Component {
	componentDidMount() {
		const {
			match: { params: { usu_id, tar_id }},
			tareas,
			cambioUsuarioId,
			cambioTitulo
		} = this.props;

		if (usu_id && tar_id) {
const tarea = tareas[usu_id][tar_id];
cambioUsuarioId(tarea.userId);
cambioTitulo(tarea.title);
		}
		else {
			limpiarForma();
		}
	}
	cambioUsuarioId = (event) => {
		this.props.cambioUsuarioId(event.target.value);
	};
	cambioTitulo = (event) => {
		this.props.cambioTitulo(event.target.value);
	};

	guardar = () => {
		const { 
			match: { params: { user_id, tar_id } },
			tareas,
			usuario_id, 
			titulo, 
			agregar,
			editar 
		} = this.props;
		const nueva_tarea = {
			userId: usuario_id,
			title: titulo,
			completed: false
		};

		if (usu_id && tar_id) {
			const tarea = tareas[usu_id][tar_id];
			const tarea_editada = {
				...nueva_tarea,
				competed: tarea.completed,
			};
			editar(tarea_editada);
		}
		else {
			agregar(nueva_tarea);
		}
		
	}

	deshabilitar = ( ) => {
		const { usuario_id, titulo, cargando } = this.props;

		if (cargando) {
			return true;
		}
		if (!usuario_id || !titutlo) {
			return true;
		}
		return false;
	};

	mostrarAction = ( ) => {
		const { error, cargando } = this.props;
		if (cargando) {
			return <Spinner />;
		}
		if (error) {
			return <Fatal mensaje={error} />
		}
	};

	render() {
		return (
			<div>
				{
					(this.props.regresar) ? <Redirect to='/tareas' /> : ''
				}
				<h1>Guardar Tarea</h1>
				Usuario id:
				<input 
				type='number' 
				value={ this.props.usuaio_id }
				onChange={ this.props.cambioUsuarioId}
				/>
				<br /><br />
				Titulo:
				<input 
				value={ this.props.titulo }
				onChange={ this.props.titulo}
				/>
				<br /><br />
				<button 
				onClick={ this.Guardar }
				disabled={ this.deshabilitar }
				>
					Guardar
				</button>
				{ this.mostrarAction() }
			</div>
		);
	}
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;
export default connect(mapStateToProps) (Guardar);