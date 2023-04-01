import supertest from 'supertest'

export async function generateRandomDigits(
  request: typeof supertest,
  numberDigits = 4
) {
  const response = await request('https://www.4devs.com.br')
    .post('/ferramentas_online.php')
    .send('acao=gerar_senha')
    .send(`txt_tamanho=${numberDigits}`)
    .send('txt_quantidade=1')
    .send('ckb_maiusculas=true')
    .send('ckb_minusculas=false')
    .send('ckb_numeros=false')
    .send('ckb_especiais=false')

  return response.text.slice(0, -1)
}
