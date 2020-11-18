// scheme-model
const db = require('../data/db-config.js')
module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

async function find() {
    try {
        return await db('schemes')
    } catch (error) {
        throw error        
    }
}

async function findById(id) {
    try {
        return await 
            db('schemes')
            .where({id})
    } catch (error) {
        throw error        
    }
}

async function findSteps(id) {
    try {
        const steps = await 
            db('steps')
            .join('schemes', 'schemes.id', 'steps.scheme_id')
            .where({ scheme_id: id })
            .select('steps.scheme_id', 'steps.step_number', )
        return steps
    } catch (error) {
        throw error        
    }
}

async function add(scheme) {
    try {
        const ids = await db('schemes').insert(scheme);
        const newScheme = await findById(ids[0]);
        return newScheme;
    } catch (err) {
        throw err;
    }
}

async function update(id, changes) {
    try {
        await db('schemes').where({ id }).update(changes);
        return await findById(id);
    } catch (err) {
        throw err;
    }
}

async function remove(id) {
    try {
        return await db('schemes').del().where({ id });
    } catch (err) {
        throw err;
    }
}