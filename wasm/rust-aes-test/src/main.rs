use aes::Aes256;
use block_padding::Pkcs7;
use cbc::{Encryptor, Decryptor};
use cbc::cipher::{KeyIvInit, BlockEncryptMut, BlockDecryptMut};
use hex::{decode, encode};
use std::error::Error;

// AES-256 CBC 加密
pub fn aes_encrypt(plaintext: &[u8], key: &[u8], iv: &[u8]) -> Result<Vec<u8>, Box<dyn Error>> {
    let cipher = Encryptor::<Aes256>::new_from_slices(key, iv)
        .map_err(|e| format!("invalid key/iv length: {:?}", e))?;

    // 为明文 + 填充准备 buffer
    let mut buf = plaintext.to_vec();
    // 预留一个 block 大小的空间，保证能放下 padding
    let block_size = 16;
    let pad_len = block_size - (buf.len() % block_size);
    buf.extend(vec![0u8; pad_len]);

    let ciphertext = cipher
        .encrypt_padded_mut::<Pkcs7>(&mut buf, plaintext.len())
        .map_err(|e| format!("encrypt error: {:?}", e))?;
    Ok(ciphertext.to_vec())
}

// AES-256 CBC 解密
pub fn aes_decrypt(ciphertext: &[u8], key: &[u8], iv: &[u8]) -> Result<Vec<u8>, Box<dyn Error>> {
    let cipher = Decryptor::<Aes256>::new_from_slices(key, iv)
        .map_err(|e| format!("invalid key/iv length: {:?}", e))?;

    let mut buf = ciphertext.to_vec();
    let decrypted = cipher
        .decrypt_padded_mut::<Pkcs7>(&mut buf)
        .map_err(|e| format!("decrypt error: {:?}", e))?;
    Ok(decrypted.to_vec())
}

fn main() {
    let key_hex = "000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f";
    let iv_hex = "000102030405060708090a0b0c0d0e0f";
    let key = decode(key_hex).expect("无效的密钥十六进制");
    let iv = decode(iv_hex).expect("无效的IV十六进制");

    let plaintext = b"Hello AES-256 CBC with PKCS7!";

    // 加密
    let ciphertext = aes_encrypt(plaintext, &key, &iv).unwrap();
    println!("加密结果(HEX): {}", encode(&ciphertext));

    // 解密
    match aes_decrypt(&ciphertext, &key, &iv) {
        Ok(decrypted) => {
            println!("解密文本: {}", String::from_utf8_lossy(&decrypted));
        }
        Err(e) => println!("解密失败: {}", e),
    }
}