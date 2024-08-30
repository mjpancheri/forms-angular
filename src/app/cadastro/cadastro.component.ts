import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ConsultaCepService } from "../services/consulta-cep.service";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.css"],
})
export class CadastroComponent implements OnInit {
  constructor(private router: Router, private cepService: ConsultaCepService) {}

  ngOnInit(): void {}

  cadastrar(form: NgForm) {
    if (form.valid) {
      this.router.navigate(["/sucesso"]);
    } else {
      alert("Formulário inválido");
    }
  }

  consultarCep(event: any, form: NgForm) {
    const cep = event.target.value.replace(/\D/g, "");

    if (cep.length !== 8) {
      return;
    }

    this.cepService.getConsultaCep(cep).subscribe((data: any) => {
      if (data.erro) {
        event.target.nextElementSibling.innerText = "CEP inesistente!";
        return;
      }
      this.popularEndereco(form, data);
    });
  }

  popularEndereco(form: NgForm, data: any) {
    form.form.patchValue({
      endereco: data.logradouro,
      complemento: data.complemento,
      bairro: data.bairro,
      cidade: data.localidade,
      estado: data.uf,
    });
  }
}
