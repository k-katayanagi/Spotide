import { NextResponse, NextRequest } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const listId = formData.get('list_id');

  if (!file || !listId) {
    return NextResponse.json(
      { error: 'ファイルまたはlist_idが不足しています' },
      { status: 400 },
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const fileName = `public/${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from('images')
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: true,
    });

  if (error) {
    console.error('アップロードエラー:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  console.log('アップロード成功:', data);

  const publicUrl = supabase.storage.from('images').getPublicUrl(fileName)
    .data.publicUrl;
  console.log(publicUrl);

  const { error: updateError } = await supabase
    .from('lists')
    .update({ photo_url: publicUrl })
    .eq('list_id', Number(listId));

  if (updateError) {
    console.error(updateError);
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ url: publicUrl });
}
