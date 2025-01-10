import { Toaster } from 'react-hot-toast';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import { AiFillCaretRight } from 'react-icons/ai';
import { contenidoEstan, contenidoLinea } from '../../../utils/lineamientosText.ts';
import InputFile from '../../../components/InputFile.tsx';
import Input from '../../../components/Input.tsx';
import React from 'react';

const LineaEstan = () => {
  return (
    <div className=" p-[1rem] bg-white  mb-[1rem]">
      <Toaster />
      <Accordion allowZeroExpanded>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              <div className="flex border-b-4 border-red-600 pb-4">
                <AiFillCaretRight className="text-4xl" />
                <span className="text-3xl">Lineamientos y Estándares</span>
              </div>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel className="mt-4">
            <section className='pl-10 mt-[2rem]'>
              <article className="mb-4 w-[800px]">
                <p className="text-xl">Lineamiento 1:</p>
                <p className="text-gray-600 text-justify">{contenidoLinea}</p>
                <div className="ml-8">
                  <p className="text-xl">Estándar 1:</p>
                  <div className="text-gray-600 mb-4 text-justify">{contenidoEstan}</div>
                  <Input
                    label="Comentarios: (máx. 250 carácteres)" />
                </div>
              </article>
              <article className="mb-4 w-[800px]">
                <p className="text-xl">Lineamiento 2:</p>
                <p className="text-gray-600 text-justify">{contenidoLinea}</p>
                <div className="ml-8">
                  <p className="text-xl">Estándar 2.1:</p>
                  <div className="text-gray-600 mb-4 text-justify">{contenidoEstan}</div>
                  <Input
                    label="Comentarios: (máx. 250 carácteres)" />
                </div>
                <div className="ml-8">
                  <p className="text-xl">Estándar 2.2:</p>
                  <div className="text-gray-600 mb-4 text-justify">{contenidoEstan}</div>
                  <Input
                    label="Comentarios: (máx. 250 carácteres)" />
                </div>
                <div className="ml-8">
                  <p className="text-xl">Estándar 2.3:</p>
                  <div className="text-gray-600 mb-4 text-justify">{contenidoEstan}</div>

                  <Input
                    label="Comentarios: (máx. 250 carácteres)" />
                </div>
                <div className="ml-8">
                  <p className="text-xl">Estándar 2.4:</p>
                  <div className="text-gray-600 mb-4 text-justify">{contenidoEstan}</div>
                  <Input
                    label="Comentarios: (máx. 250 carácteres)" />
                </div>
              </article>
              <article className="mb-4 w-[800px]">
                <p className="text-xl">Lineamiento 3:</p>
                <p className="text-gray-600 text-justify">{contenidoLinea}</p>
                <div className="ml-8">
                  <p className="text-xl">Estándar 3.1:</p>
                  <div className="text-gray-600 mb-4 text-justify">{contenidoEstan}</div>
                  <Input
                    label="Comentarios: (máx. 250 carácteres)" />
                </div>
                <div className="ml-8">
                  <p className="text-xl">Estándar 3.2:</p>
                  <div className="text-gray-600 mb-4 text-justify">{contenidoEstan}</div>
                  <Input
                    label="Comentarios: (máx. 250 carácteres)" />
                </div>
              </article>
              <article className="mb-4 w-[800px]">
                <p className="text-xl">Lineamiento 4:</p>
                <p className="text-gray-600 text-justify">{contenidoLinea}</p>
                <div className="ml-8">
                  <p className="text-xl">Estándar 4.1:</p>
                  <div className="text-gray-600 mb-4 text-justify">{contenidoEstan}</div>
                  <Input
                    label="Comentarios: (máx. 250 carácteres)" />
                </div>
              </article>
              <article className="mb-8 w-[800px]">
                <p className="text-xl">Lineamiento 5:</p>
                <p className="text-gray-600 text-justify">{contenidoLinea}</p>
                <div className="ml-8">
                  <p className="text-xl">Estándar 5.1:</p>
                  <div className="text-gray-600 mb-4 text-justify">{contenidoEstan}</div>
                  <Input
                    label="Comentarios: (máx. 250 carácteres)" />
                </div>
              </article>
            </section>

          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default LineaEstan;