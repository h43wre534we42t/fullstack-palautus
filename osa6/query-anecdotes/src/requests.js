const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  return await response.json()
}

export const createNew = async (content) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0}),
  }
  const response = await fetch(baseUrl, options)

  if (!response.ok) {
    throw new Error('Failed to add an anecdote')
  }

  return await response.json()
}

export const vote = async (a) => {
  const response = await fetch(`${baseUrl}/${a.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({content: a.content, id: a.id, votes: a.votes + 1}),
  })

  if (!response.ok) {
    throw new Error('Failed to vote')
  }

  return await response.json()
}